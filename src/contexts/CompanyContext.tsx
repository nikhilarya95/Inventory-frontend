'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { companyAPI } from '@/lib/api';

interface CompanyData {
    name: string;
    address: string;
    phone: string;
    gst?: string;
    email?: string;
    logo?: string;
}

interface CompanyContextType {
    company: CompanyData | null;
    isLoading: boolean;
    refreshCompany: () => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
    const [company, setCompany] = useState<CompanyData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadCompany = async () => {
        try {
            const response = await companyAPI.get();
            setCompany(response.data);
            // Update document title dynamically
            if (response.data?.name) {
                document.title = response.data.name;
            }
        } catch (error) {
            console.error('Error loading company data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCompany();
    }, []);

    // Update title whenever company name changes
    useEffect(() => {
        if (company?.name) {
            document.title = company.name;
        }
    }, [company?.name]);

    return (
        <CompanyContext.Provider value={{ company, isLoading, refreshCompany: loadCompany }}>
            {children}
        </CompanyContext.Provider>
    );
}

export function useCompany() {
    const context = useContext(CompanyContext);
    if (context === undefined) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
}
