import React from 'react';
import Card from './card/Card';
import { AiOutlineClockCircle } from 'react-icons/ai';

const PendingCard = ({ amount, date }) => {
    return (
        <Card className="
            mt-6 p-6 sm:p-8 
            bg-white/30 backdrop-blur-md
            border border-white/20 rounded-2xl 
            shadow-lg hover:shadow-xl transition-shadow duration-300
            relative overflow-hidden
        ">
            {/* Gradient accent ring */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-200/20 to-transparent pointer-events-none"></div>

            <div className="flex items-center justify-between relative z-10">
                <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1">
                        Your Deposit is Pending Wait for Approval
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                        ৳{Number(amount || 0).toLocaleString('en-BD', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                        Submitted: {new Date(date).toLocaleDateString()}
                    </p>
                </div>
                <div className="relative">
                    <div className="bg-yellow-100 p-3 sm:p-4 rounded-full shadow-inner flex items-center justify-center">
                        <AiOutlineClockCircle className="text-yellow-600" size={32} />
                    </div>
                    {/* Glow ring */}
                    <div className="absolute -inset-1 rounded-full bg-yellow-400/30 blur-xl opacity-40 animate-pulse"></div>
                </div>
            </div>
        </Card>
    );
};

export default PendingCard;
