"use client";
import React from "react";
import { cn } from "@/lib/utils";




export function FrequentlyAskedQuestions() {



  return (
    <div className="w-full max-w-7xl mx-auto my-5 md:my-10 py-5 md:py-10 px-4 md:px-8">
      <div className="text-balance relative z-20 mx-auto mb-4 max-w-4xl text-center">
        <h2
          className={cn(
            "block text-3xl md:text-6xl bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)]",
            "bg-clip-text text-transparent pb-2"
          )}
        >
          Seu mentor Ramiro Amorim
        </h2>
      </div>
      <p className="max-w-4xl text-base text-center mx-auto mt-4 text-neutral-400 px-4 md:px-0 leading-relaxed">
      Ramiro Amorim é um jovem empresário que descobriu o mercado de infoprodutos globais no final do ano de 2023! Desde então sua vida mudou completamente.

Já faturou 4.8 Milhões de reais nos últimos meses com uma estratégia pouco conhecida sobre vendas de infoprodutos no tráfego direto multi moedas. 

Em 2022 teve sua empresa totalmente falida e sem recursos para continuar no ramo de vendas e trocas de veículos usados.

Então conheceu o mercado de infoprodutos globais e resolveu apostar tudo que havia sobrado neste mercado...

Então em alguns meses conseguiu sair do absoluto zero e faturar milhões sem aparecer e agora quer compartilhar este conhecimento com pessoas dedicadas a conhecer este modelo de negócio e começar a faturar de 100k a 500k por mês antes da metade do ano de 2025.
      </p>
      </div>
    
  );
}