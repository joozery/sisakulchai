
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, ListOrdered, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const UserPortalLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { to: '/account', icon: LayoutDashboard, label: 'dashboard' },
        { to: '/profile', icon: User, label: 'profile' },
        { to: '/order-history', icon: ListOrdered, label: 'order_history' },
        { to: '/cart', icon: ShoppingCart, label: 'my_cart' },
    ];

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                <aside className="md:w-1/4 lg:w-1/5">
                    <div className="bg-white rounded-xl shadow-md p-6 sticky top-28">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                                {user?.username?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 break-all">{user?.username}</h2>
                                <p className="text-sm text-gray-500 break-all">{user?.email}</p>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === '/account'}
                                    className={({ isActive }) =>
                                        cn(
                                            'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                                            isActive
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        )
                                    }
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{t(item.label)}</span>
                                </NavLink>
                            ))}
                            <Button
                                onClick={handleLogout}
                                variant="ghost"
                                className="w-full justify-start mt-4 text-red-600 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 px-4 py-3"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>{t('logout')}</span>
                            </Button>
                        </nav>
                    </div>
                </aside>
                <main className="md:w-3/4 lg:w-4/5">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserPortalLayout;
