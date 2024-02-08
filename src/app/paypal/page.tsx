'use client';
import { useState } from 'react';
import * as Icons from '@heroicons/react/24/outline';
import { getCountry } from '@/types/utils';
import {
	fixedFareByRegion,
	internationalFare,
	standardFare,
} from '@/data/feesPaypal';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Paypal() {
	const [amount, setAmount] = useState(0);
	const [country, setCountry] = useState('BRL');
	const [typeFees, setTypeFees] = useState('saleswithinthecountry');

	const validAmount = amount <= 0 || isNaN(amount);

	const flatRate = (amount * standardFare) / 100;
	const internationalTax = (amount * internationalFare) / 100;
	const rateWithinCountry = validAmount
		? 0
		: flatRate + fixedFareByRegion(country);
	const rateOutsideTheCountry = validAmount
		? 0
		: flatRate + internationalTax + fixedFareByRegion(country);

	const totalFare =
		typeFees === 'saleswithinthecountry'
			? rateWithinCountry
			: rateOutsideTheCountry;

	const amountToReceive = validAmount ? 0 : amount - totalFare;
	const amountThatMustBeCharged = validAmount ? 0 : amount + totalFare;

	return (
		<div className="container xl:w-2/4 w-auto mx-auto px-4 py-5">
			<div className="flex items-center justify-center ">
				<Header />
			</div>
			<div className="rounded-xl border-2 border-gray-100 bg-white px-5">
				<div className="text-center sm:text-left">
					<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
						Calculadora de taxas do PayPal
					</h1>

					<p className="mt-1.5 text-sm text-gray-500">
						As taxas de transação são aplicadas à venda de produtos
						e serviços na loja online do Paypal. Os valores são
						diferentes de acordo com o tipo de transação e podem ser
						descritos como uma taxa de processamento de pagamento ou
						taxa do vendedor. As taxas são divididas em recebimentos
						de transações domésticas ou internacionais e consideram
						os tipos de pagamentos, que podem ser parcelados, por
						pix, em lote e micropagamentos.
					</p>
					<p className="mt-1.5 text-sm text-gray-500">
						As taxas são divididas em recebimentos de transações
						domésticas ou internacionais e consideram os tipos de
						pagamentos, que podem ser parcelados, por pix, em lote e
						micropagamentos.
					</p>
				</div>

				<div className="flex-row items-center justify-center p-4 sm:p-6 lg:p-8">
					<div className="pb-4">
						<label
							htmlFor="amount"
							className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
						>
							<input
								type="number"
								id="amount"
								placeholder="Insira o valor"
								className="peer text-gray-700 h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
								value={amount}
								onChange={(e) => {
									setAmount(e.target.valueAsNumber);
								}}
							/>

							<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
								Insira o valor
							</span>
						</label>
					</div>

					<div className="pb-4">
						<label
							htmlFor="country"
							className="block text-sm font-medium text-gray-700"
						>
							Região
						</label>

						<select
							name="country"
							id="country"
							className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
							value={country}
							onChange={(e) => {
								setCountry(e.target.value);
							}}
						>
							<option value="BRL">Brasil</option>
							<option value="USD">Estados Unidos</option>
							<option value="EUR">Europa</option>
						</select>
					</div>

					<div className="pb-4">
						<label
							htmlFor="fees"
							className="block text-sm font-medium text-gray-900"
						>
							Taxas do PayPal
						</label>

						<select
							name="fees"
							id="fees"
							className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
							value={typeFees}
							onChange={(e) => {
								setTypeFees(e.target.value);
							}}
						>
							<option value="saleswithinthecountry">
								Vendas dentro do {getCountry(country)}
							</option>
							<option value="salesoutsidethecountry">
								Vendas fora do {getCountry(country)}
							</option>
						</select>
					</div>

					<div className="mt-8 sm:mt-12">
						<dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100">
							<div className="flex flex-col px-4 py-8 text-center">
								<dt className="order-last text-lg font-medium text-gray-500">
									Valor da Taxa total
								</dt>

								<dd className="font-extrabold text-red-600">
									{totalFare.toLocaleString('pt-br', {
										style: 'currency',
										currency: country,
									})}
								</dd>
							</div>

							<div className="flex flex-col px-4 py-8 text-center">
								<dt className="order-last text-lg font-medium text-gray-500">
									Você receberá
								</dt>

								<dd className="font-extrabold text-green-600">
									{amountToReceive.toLocaleString('pt-br', {
										style: 'currency',
										currency: country,
									})}
								</dd>
							</div>

							<div className="flex flex-col px-4 py-8 text-center">
								<dt className="order-last text-lg font-medium text-gray-500">
									Você deveria pedir por
								</dt>

								<dd className="font-extrabold text-yellow-600">
									{amountThatMustBeCharged.toLocaleString(
										'pt-br',
										{
											style: 'currency',
											currency: country,
										}
									)}
								</dd>
							</div>
						</dl>
					</div>

					<div className="flex items-center justify-center">
						<Link
							onClick={(e) => {
								setAmount(0);
								setCountry('BRL');
								setTypeFees('saleswithinthecountry');
							}}
							className="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
							href={''}
						>
							<span className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500">
								Limpar
							</span>

							<span className="shrink-0 p-2 text-white group-hover:text-indigo-600 group-active:text-indigo-500">
								<Icons.TrashIcon className="size-5" />
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
