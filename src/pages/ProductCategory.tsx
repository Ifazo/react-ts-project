import ProductFilters from "../components/ProductFilters";
import { useAppSelector } from "../provider/hook";

export default function ProductCategory() {

    const { user } = useAppSelector((state) => state.user);
    console.log(user.email)
    // const { data: products, isLoading } = useGetProductsQuery(user?.id);

    return (
        <div>
            <ProductFilters />
        </div>
    )
}
