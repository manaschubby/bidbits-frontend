"use client";
import ProductCard from "@/components/ProductCard";
import useLogin from "@/hooks/useLogin";
import * as React from "react";

export interface IProductsProps {}

export default function Products(props: IProductsProps) {
	const { checkLogin } = useLogin();
	const [products, setProducts] = React.useState([]);

	const getProducts = async () => {
		const res = await fetch("/api/products");
		const data = await res.json();
		setProducts(data.products);
	};
	React.useEffect(() => {
		checkLogin();
		getProducts();
	}, []);
	return (
		<div className="flex flex-col items-center justify-center h-screen min-h-[100vh]">
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
									Our Products
								</h1>
								<p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
									Explore the wide variety of products available for auction
									within your college community.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{products.map((product: any) => (
								<ProductCard
									details
									product={product}
									key={product.productId}
								/>
							))}
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
