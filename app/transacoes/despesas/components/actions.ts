'use server';

import { Expense } from './types';

export async function addExpense(expense: Expense) {
  // Aqui você implementaria a lógica para adicionar a despesa ao banco de dados
  console.log('Adicionando despesa:', expense);
  // Simular um delay para representar a operação de banco de dados
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Retornar um ID simulado para a nova despesa
  return { id: Math.random().toString(36).substr(2, 9) };
}

