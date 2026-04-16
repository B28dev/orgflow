import { createBrowserRouter } from 'react-router-dom'

import { AppShell } from './layout/AppShell'
import { CadastroScreen } from '../screens/CadastroScreen'
import { DashboardScreen } from '../screens/DashboardScreen'
import { EstoqueScreen } from '../screens/EstoqueScreen'
import { HistoricoScreen } from '../screens/HistoricoScreen'

type RouteHandle = {
  badge: string
  title: string
  description: string
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardScreen />,
        handle: {
          badge: 'Dashboard',
          title: 'Dashboard Geral',
          description: 'visão resumida do estoque, entradas, saídas e alertas da operação',
        } satisfies RouteHandle,
      },
      {
        path: 'dashboard',
        element: <DashboardScreen />,
        handle: {
          badge: 'Dashboard',
          title: 'Dashboard Geral',
          description: 'visão resumida do estoque, entradas, saídas e alertas da operação',
        } satisfies RouteHandle,
      },
      {
        path: 'estoque',
        element: <EstoqueScreen />,
        handle: {
          badge: 'Estoque',
          title: 'Buscar e ajustar o estoque',
          description: 'consulte produtos, veja alertas e siga com as ações rápidas da operação',
        } satisfies RouteHandle,
      },
      {
        path: 'cadastrar',
        element: <CadastroScreen />,
        handle: {
          badge: 'Cadastro',
          title: 'Cadastrar novo item',
          description: 'preencha só os dados essenciais para incluir o produto e acompanhar o estoque',
        } satisfies RouteHandle,
      },
      {
        path: 'historico',
        element: <HistoricoScreen />,
        handle: {
          badge: 'Histórico',
          title: 'Acompanhar movimentações',
          description: 'consulte entradas, saídas, ajustes e remoções em uma linha do tempo fácil de conferir',
        } satisfies RouteHandle,
      },
    ],
  },
])

export type { RouteHandle }
