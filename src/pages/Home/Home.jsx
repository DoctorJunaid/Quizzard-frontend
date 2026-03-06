import React from 'react';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import Categories from '../../components/Categories/Categories';
import CTA from '../../components/CTA/CTA';

export default function Home() {
    return (
        <>
            <Hero />
            <Features />
            <Categories />
            <CTA />
        </>
    );
}
