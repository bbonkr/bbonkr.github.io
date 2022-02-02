import * as React from 'react';
import { Link, navigate } from 'gatsby';

interface PageNavProp {
    showDescription?: boolean;
    useShortcut?: boolean;
    current: number;
    total: number;
    path: string;
}

export const PageNav = ({
    current,
    total,
    path,
    showDescription,
    useShortcut,
}: PageNavProp) => {
    const [selectedPage, setSelectedPage] = React.useState<string>(
        `${current}`
    );

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const value = event.target.value;

        setSelectedPage((_) => value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedPage && selectedPage !== `${current}`) {
            navigate(
                `${path}${selectedPage === '1' ? '' : `/${selectedPage}`}`
            );
        }
    };

    return (
        <nav>
            <div className="font-sans container max-w-4xl mx-auto flex flex-col justify-center items-center">
                <div className="w-full mx-auto flex flex-wrap">
                    <div className="flex-start text-left md:w-1/2 flex-1">
                        {current > 1 && (
                            <React.Fragment>
                                <span className="text-xs md:text-sm font-normal text-gray-600">
                                    &lt; Previous Page
                                </span>

                                <Link
                                    to={`${path}${
                                        current - 1 < 2 ? '' : `/${current - 1}`
                                    }`}
                                    rel="prev"
                                    className="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
                                >
                                    <br />
                                    {`Previous Page`}
                                </Link>
                            </React.Fragment>
                        )}
                    </div>
                    <div className="flex-end text-right md:w-1/2 flex-1">
                        {current < total && (
                            <React.Fragment>
                                <span className="text-xs md:text-sm font-normal text-gray-600">
                                    Next Page &gt;
                                </span>
                                <br />
                                <Link
                                    to={`${path}/${current + 1}`}
                                    rel="next"
                                    className="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
                                >
                                    {`Next Page`}
                                </Link>
                            </React.Fragment>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center w-full gap-3 my-6 flex-wrap">
                    {showDescription && (
                        <div className="">
                            <h2 className="flex gap-2 text-sm">
                                <span>{`Posts on`}</span>
                                <span className="text-green-500">{`${current}`}</span>
                                <span>of</span>
                                <span>{`${total} page${
                                    total > 1 ? 's' : ''
                                }`}</span>
                            </h2>
                        </div>
                    )}
                    {useShortcut && (
                        <form onSubmit={handleSubmit} className="flex gap-1">
                            <select
                                className="rounded-md shadow-sm border-green-600 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                onChange={handleChange}
                                value={selectedPage}
                            >
                                {Array.from({ length: total }).map(
                                    (_, index) => (
                                        <option
                                            key={index + 1}
                                            value={index + 1}
                                        >
                                            {index + 1}
                                        </option>
                                    )
                                )}
                            </select>
                            <button
                                type="submit"
                                className="button bg-green-600 text-gray-100 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                            >
                                Go
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
};
