import { test, expect } from '@playwright/test';

test.describe('Lista de tarefas', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page.getByTestId('app-container')).toBeVisible();
    });

    test('deve carregar a tela inicial', async ({ page }) => {
        // Verifica se o título da página está visível
        await expect(page.getByTestId('titulo-pagina')).toBeVisible();
        await expect(page.getByTestId('titulo-pagina')).toHaveText('Minha Lista de Tarefas');

        // Verifica o contador de tarefas
        await expect(page.getByTestId('contador-tarefas')).toBeVisible();
        
        // Verifica se o formulário está visível
        await expect(page.getByTestId('form-tarefa')).toBeVisible();
        await expect(page.getByTestId('input-nova-tarefa')).toBeVisible();
        await expect(page.getByTestId('botao-adicionar-tarefa')).toBeVisible();
        
        // Verifica se a lista de tarefas está visível
        await expect(page.getByTestId('lista-tarefas')).toBeVisible();
    });

    test('deve adicionar uma nova tarefa', async ({ page }) => {
        // Preenche o input e clica no botão
        await page.getByTestId('input-nova-tarefa').fill('Fazer compras');
        await page.getByTestId('botao-adicionar-tarefa').click();
        
        // Verifica se a tarefa foi adicionada
        await expect(page.locator('text=Fazer compras')).toBeVisible();
        
        // Verifica se o input foi limpo
        await expect(page.getByTestId('input-nova-tarefa')).toHaveValue('');
    });

    test('deve remover uma tarefa', async ({ page }) => {
        // Adiciona uma nova tarefa
        await page.getByTestId('input-nova-tarefa').fill('Tarefa a remover');
        await page.getByTestId('botao-adicionar-tarefa').click();
        
        // Aguarda a tarefa aparecer
        const taskText = page.locator('text=Tarefa a remover');
        await expect(taskText).toBeVisible();
        
        // Encontra o item da tarefa e clica no botão de remover dentro dele
        const taskItem = page.getByTestId('item-tarefa').filter({ has: taskText });
        await taskItem.getByRole('button', { name: /Remover/ }).click();
        
        // Verifica se a tarefa foi removida
        await expect(page.locator('text=Tarefa a remover')).not.toBeVisible();
    });

    test('deve marcar uma tarefa como concluída', async ({ page }) => {
        // Adiciona uma nova tarefa
        await page.getByTestId('input-nova-tarefa').fill('Tarefa a concluir');
        await page.getByTestId('botao-adicionar-tarefa').click();
        
        // Aguarda a tarefa aparecer
        await expect(page.locator('text=Tarefa a concluir')).toBeVisible();
        
        // Clica na tarefa para marcar como concluída
        const taskButton = page.locator('button:has-text("Tarefa a concluir")').first();
        await taskButton.click();
        
        // Verifica se a classe 'done' foi adicionada
        await expect(taskButton).toHaveClass(/done/);
    });
});