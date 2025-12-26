import React from 'react'
import AppFunctional from './AppFunctional'
import { render, screen, fireEvent } from '@testing-library/react'

beforeEach(() => {
  render(<AppFunctional />)
})

test('Başlıklar ekranda doğru şekilde görüntüleniyor', () => {
  expect(screen.getByText('Koordinatlar')).toBeInTheDocument();
  expect(screen.getByText('kere ilerlediniz')).toBeInTheDocument();
})

test('Butonlar ekranda doğru şekilde görüntüleniyor', () => {
  expect(screen.getByText('YUKARI')).toBeInTheDocument();
  expect(screen.getByText('AŞAĞI')).toBeInTheDocument();
  expect(screen.getByText('SOL')).toBeInTheDocument();
  expect(screen.getByText('SAĞ')).toBeInTheDocument();
  expect(screen.getByText('reset')).toBeInTheDocument();
})

test('Input ve gönder butonu ekranda doğru şekilde görüntüleniyor', () => {
  expect(screen.getByPlaceholderText('email girin')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
})

test('Email inputuna yazı yazıldığında değeri değişiyor', () => {
  const emailInput = screen.getByPlaceholderText('email girin');
  fireEvent.change(emailInput, {
    target: {value : 'kerem@garip.com'},
  })
  expect(emailInput).toHaveValue('kerem@garip.com');
})