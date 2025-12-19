import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

const MainLayoutContent: React.FC = () => {
    const { isOpen, isCollapsed, closeSidebar } = useSidebar();

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            <Sidebar />

            <div
                className={cn(
                    'transition-all duration-300',
                    'lg:ml-64', // Desktop default
                    isCollapsed && 'lg:ml-20', // Desktop collapsed
                    'ml-0' // Mobile always 0
                )}
            >
                <TopNavbar />

                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const MainLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <MainLayoutContent />
        </SidebarProvider>
    );
};

export default MainLayout;
