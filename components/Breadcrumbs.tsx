
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, HouseIcon } from './icons';

interface BreadcrumbPath {
    name: string;
    path?: string;
}

interface BreadcrumbsProps {
    paths: BreadcrumbPath[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2 text-sm">
                <li>
                    <Link to="/" className="text-brand-muted hover:text-brand-dark">
                        <HouseIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {paths.slice(1).map((path, index) => (
                    <li key={path.name}>
                        <div className="flex items-center">
                            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-brand-muted" aria-hidden="true" />
                            {path.path && index < paths.length - 2 ? (
                                <Link
                                    to={path.path}
                                    className="ml-2 font-medium text-brand-muted hover:text-brand-dark"
                                >
                                    {path.name}
                                </Link>
                            ) : (
                                <span className="ml-2 font-semibold text-brand-dark">
                                    {path.name}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;