'use client';
import React, { useState } from 'react';

import * as Icon from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	fixedFareByRegion,
	internationalFare,
	standardFare,
} from '@/data/feesPaypal';
import { countries } from '@/data/countries';
import { getCountry } from '@/types/utils';

export default function Paypal() {
	const [amount, setAmount] = useState<number>(0);
	const [country, setCountry] = useState<string>('BRL');
	const [typeFees, setTypeFees] = useState<string>('saleswithinthecountry');

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
	const amountThatMustBeCharged = validAmount ? 0 : amount + amount * 0.071;

	return (
		<Card className="container xl:w-2/4 w-auto mx-auto px-4 py-5">
			<CardHeader>
				<CardTitle>Calculadora de taxas do PayPal</CardTitle>
				<CardDescription>
					As taxas de transação são aplicadas à venda de produtos e
					serviços na loja online do Paypal. Os valores são diferentes
					de acordo com o tipo de transação e podem ser descritos como
					uma taxa de processamento de pagamento ou taxa do vendedor.
					As taxas são divididas em recebimentos de transações
					domésticas ou internacionais e consideram os tipos de
					pagamentos, que podem ser parcelados, por pix, em lote e
					micropagamentos.
				</CardDescription>
				<CardDescription>
					As taxas são divididas em recebimentos de transações
					domésticas ou internacionais e consideram os tipos de
					pagamentos, que podem ser parcelados, por pix, em lote e
					micropagamentos.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid w-full items-center gap-4">
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="amount">Valor a cobrar</Label>
						<Input
							type="number"
							id="amount"
							placeholder="Insira o valor"
							value={amount}
							onChange={(e) => {
								setAmount(e.target.valueAsNumber);
							}}
						/>
					</div>
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="country">País/Região</Label>
						<Select
							defaultValue={country}
							onValueChange={(country) => {
								setCountry(country);
							}}
						>
							<SelectTrigger id="country">
								<SelectValue placeholder="Selecione" />
							</SelectTrigger>
							<SelectContent position="popper">
								{countries.map((item, index) => (
									<SelectItem key={index} value={item.coin}>
										{item.country}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="country">Formato da venda</Label>
						<Select
							defaultValue={typeFees}
							onValueChange={(typeFees) => {
								setTypeFees(typeFees);
							}}
						>
							<SelectTrigger id="country">
								<SelectValue placeholder="Selecione" />
							</SelectTrigger>
							<SelectContent position="popper">
								<SelectItem value="saleswithinthecountry">
									Vendas para dentro do {getCountry(country)}
								</SelectItem>
								<SelectItem value="salesoutsidethecountry">
									Vendas para fora do {getCountry(country)}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="my-6 w-full overflow-y-auto">
					<table className="w-full">
						<thead>
							<tr className="m-0 border-t p-0 even:bg-muted">
								<th className="border px-4 py-2 text-center font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
									Você receberá
								</th>
								<th className="border px-4 py-2 text-center font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
									Valor da Taxa total
								</th>
								<th className="border px-4 py-2 text-center font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
									Você deveria pedir por
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="m-0 border-t p-0 even:bg-muted">
								<td className="border px-4 py-2 text-center text-green-600 [&[align=center]]:text-center [&[align=right]]:text-right">
									{amountToReceive.toLocaleString('pt-br', {
										style: 'currency',
										currency: country,
									})}
								</td>
								<td className="border px-4 py-2 text-center text-red-600 [&[align=center]]:text-center [&[align=right]]:text-right">
									{totalFare.toLocaleString('pt-br', {
										style: 'currency',
										currency: country,
									})}
								</td>
								<td className="border px-4 py-2 text-center text-yellow-600 [&[align=center]]:text-center [&[align=right]]:text-right">
									{amountThatMustBeCharged.toLocaleString(
										'pt-br',
										{
											style: 'currency',
											currency: country,
										}
									)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</CardContent>

			<CardFooter className="flex justify-center items-center">
				<Button
					onClick={() => {
						setAmount(0);
						setCountry('BRL');
						setTypeFees('saleswithinthecountry');
					}}
					disabled={amount === 0}
				>
					<Icon.TrashIcon className="mr-2 h-4 w-4" />
					Limpar
				</Button>
			</CardFooter>
		</Card>
	);
}
