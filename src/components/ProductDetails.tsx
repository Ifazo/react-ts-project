import { Link, useParams } from 'react-router-dom'
import { useDeleteProductMutation, useGetProductByIdQuery } from '../provider/api/apiSlice'
import { useAppSelector } from '../provider/hook'
import { CheckIcon, MailIcon, StarIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Modal from './Modal'
import toast from 'react-hot-toast'

const reviews = { average: 4, totalCount: 1624 }

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {

    const { id } = useParams();
    const { user } = useAppSelector(state => state.user)
    console.log(user)
    const { data: product } = useGetProductByIdQuery(id as string);
    console.log(product)

    const [ deleteProduct ] = useDeleteProductMutation()

    const handleDelete = () => {
        deleteProduct(id as string)
            .then((res) => {
                if (res?.data.deletedCount > 0) {
                    toast.success('Product deleted successfully')
                }
            }).catch((err) => {
                toast.error('Failed to delete product')
            })
    }

    const [ open, setOpen ] = useState(false)
    // const cancelButtonRef = useRef(null)

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                {/* Product details */}
                <div className="lg:max-w-lg lg:self-end">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-2">
                            <li>
                                <div className="flex items-center text-sm">
                                    <Link to="/books" className="font-medium text-gray-500 hover:text-gray-900">
                                        Books
                                    </Link>

                                    <svg
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="ml-2 flex-shrink-0 h-5 w-5 text-gray-300"
                                    >
                                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                    </svg>
                                    <Link to="/books" className="font-medium text-gray-500 hover:text-gray-900">
                                        {product?.genre}
                                    </Link>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="mt-4">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product?.title}</h1>
                    </div>

                    <section aria-labelledby="information-heading" className="mt-4">
                        <h2 id="information-heading" className="sr-only">
                            Product information
                        </h2>

                        <div className="flex items-center">
                            <p className="text-lg text-gray-900 sm:text-xl">${product?.price}</p>

                            <div className="ml-4 pl-4 border-l border-gray-300">
                                <h2 className="sr-only">Reviews</h2>
                                <div className="flex items-center">
                                    <div>
                                        <div className="flex items-center">
                                            {[ 0, 1, 2, 3, 4 ].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    </div>
                                    <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 space-y-6">
                            <p className="text-base text-gray-500">{product?.description}</p>
                        </div>

                        <div className="mt-6 flex items-center">
                            <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500" aria-hidden="true" />
                            <p className="ml-2 text-sm text-gray-500">{product?.author}</p>
                        </div>
                    </section>
                </div>

                {/* Product image */}
                <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
                    <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                        <img src={product?.image} alt="cover" className="w-full h-full object-center object-cover" />
                    </div>
                </div>

                {/* Product form */}
                <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
                    <section aria-labelledby="options-heading">
                        <h2 id="options-heading" className="sr-only">
                            Product options
                        </h2>

                        <form>
                            <div className="flex justify-between">
                                <Link
                                    to={`/edit/${id}`}
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <MailIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete()}
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <MailIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    Delete
                                </button>

                            </div>
                            {/* <div className="mt-4">
                                <a href="#" className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                                    <span>{product?.date}</span>
                                    <QuestionMarkCircleIcon
                                        className="flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </a>
                            </div> */}
                            <div className="mt-10">
                                <Link
                                    to="#"
                                    className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                >
                                    Add to Wishlist
                                </Link>
                            </div>
                            <Link
                                to="#"
                                onClick={() => setOpen(true)}
                                className="mt-6 inline-flex w-full bg-white border border-gray-300 rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                            >
                                Write a review
                            </Link>
                        </form>
                    </section>
                    <Modal open={open} setOpen={setOpen} product={product} />
                </div>
            </div>
        </div>
    )
}
