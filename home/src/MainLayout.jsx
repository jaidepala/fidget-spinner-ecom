import React from "react";

// Router Dom
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Switch,
} from "react-router-dom";

// CSS
import "remixicon/fonts/remixicon.css";
import "./index.scss";

// Components
import Header from "home/Header";
import Footer from "home/Footer";
import PDPContent from "pdp/PDPContent";
import HomeContent from "home/HomeContent";
import CartContent from "cart/CartContent";

export default function MainLayout() {
    return (
        <Router>
            <div className="text-3xl mx-auto max-w-6xl">
                <Header />
                <div className="my-10">
                    <Routes>
                        <Route exact path="/" element={<HomeContent />} />
                        <Route path="/home" element={<HomeContent />} />
                        <Route path="/product/:id" element={<PDPContent />} />
                        <Route path="/cart" element={<CartContent />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}
