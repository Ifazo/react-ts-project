/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { IReview } from '../provider/types/Types'
import { useAppSelector } from '../provider/hook'
import { usePostReviewMutation } from '../provider/api/apiSlice'

export default function Modal({ open, setOpen, product }) {

    const [ rating, setRating ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ details, setDetails ] = useState('')

    const cancelButtonRef = useRef(null)
    const { user } = useAppSelector(state => state.user)
    // const [ postReview, { isLoading, isError } ] = usePostReviewMutation()

    const handleReview = async () => {
        const name = user?.name
        const email = user?.email
        const bookId = product?._id
        const createdAt = Date()

        const review: IReview = {
            bookId,
            name,
            email,
            rating,
            title,
            details,
            createdAt
        }
        await fetch("http://localhost:5000/api/book/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
        })
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                                    <StarIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Review
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        {/* Rating input box start */}
                                        <div>
                                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                                Rating
                                            </label>
                                            <select
                                                id="rating"
                                                name="rating"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                defaultValue="5"
                                            >
                                                <option value="5">5 Star</option>
                                                <option value="4">4 Star</option>
                                                <option value="3">3 Star</option>
                                                <option value="2">2 Star</option>
                                                <option value="1">1 Star</option>
                                            </select>
                                        </div>
                                        {/* Rating input box end */}
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                Title
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="title"
                                                    name="title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="your title..."
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                                                Details
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    id="details"
                                                    name="details"
                                                    value={details}
                                                    onChange={(e) => setDetails(e.target.value)}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="your comment..."
                                                />
                                            </div>
                                        </div>
                                        {/* Review input field end */}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                    onClick={() => { setOpen(false), handleReview() }}
                                >
                                    Review
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}