import Card from "./card/Card";
import ADDBalance from "./ADDBalance";
import { useNavigate } from "react-router";
import BalanceDetails from "./BalanceDetails";
// import axios from "axios";
import { useEffect, useState } from "react";
import { getBalance } from "../api/Api";
import { FiCircle, FiDollarSign, FiPieChart, FiTable } from "react-icons/fi";
import { GiWallet, GiMeal } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";
import { PiChartDonutFill } from "react-icons/pi";
import { getMealPlanByMonth } from "../api/Api";
import { GiMoneyStack } from "react-icons/gi";
const Acount = () => {
    const navigate = useNavigate();
    const [totalMeal, setTotalMeal] = useState(0);
    const [balanceData, setBalanceData] = useState(null);
    const [currentBalance,setCurrentBalance] = useState(null);
    const [dueBalance,setDueBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const handleClick = () => {
        navigate("/addbalance");
    };
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await getBalance();
                const balance = res.data[0];
                setBalanceData(balance);
               const due= balance.currentBalance;
               if(due<0){
                setDueBalance(`${Math.abs(due)}`);
                setCurrentBalance('0');
               } 
               else if(due>0){
                setCurrentBalance(`${due}`);
                setDueBalance('0');

               }
                console.log(balance);
            } catch (error) {
                console.error("Error fetching Balance", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBalance();
    }, []);
    useEffect(() => {
        const fetchMonthlyMealCount = async () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0");

            try {
                const res = await getMealPlanByMonth(year, month);
                const mealPlans = res.data;
                const total = mealPlans.reduce((sum, plan) => {
                    const mealsWeight = plan.meals.reduce(
                        (innerSum, meal) => innerSum + meal.weight,0);
                    return sum + mealsWeight;
                }, 0);
                setTotalMeal(total);
            } catch (error) {
                console.error("Error fetching meal count:", error);
            }
        };

        fetchMonthlyMealCount();
    }, []);

    return (
        <>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 bg-gray-100 text-black font-bold p-3 sm:p-5">
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <GiWallet className="mx-auto text-[#00bf7d] text-3xl" />
                    <h3 className="text-lg font-semibold mt-2">My Deposit</h3>
                    <p className="text-xl font-bold">{loading ? "Loading..." : balanceData?.totalBalance ?? "N/A"}</p>
                    <p className="text-gray-500 text-sm">This Month</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <FcMoneyTransfer className="mx-auto text-[#c44601] text-3xl" />
                    <h3 className="text-lg font-semibold mt-2">Current Balance</h3>
                    <p className="text-xl font-bold">{currentBalance}</p>
                    <p className="text-gray-500 text-sm">This Month</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <GiMeal className="mx-auto text-[#0073e6] text-3xl" />
                    <h3 className="text-lg font-semibold mt-2">Total Meal</h3>
                    <p className="text-xl font-bold">{totalMeal}</p>
                    <p className="text-gray-500 text-sm">This Month</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <FiDollarSign className="mx-auto text-[#e6308a] text-3xl" />
                    <h3 className="text-lg font-semibold mt-2">Total Cost</h3>
                    <p className="text-xl font-bold">{loading ? "Loading..." : balanceData?.totalCost ?? "N/A"}</p>
                    <p className="text-gray-500 text-sm">This Month</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <FiPieChart className="mx-auto text-[#f57600] text-3xl" />
                    <h3 className="text-lg font-semibold mt-2">Meal Rate</h3>
                    <p className="text-xl font-bold">{loading ? "Loading..." : balanceData?.mealRate ?? "N/A"}</p>
                    <p className="text-gray-500 text-sm">This Month</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <PiChartDonutFill className="mx-auto text-[#89ce00] text-3xl" />
                    <h3 className="text-lg font-semibold mt-2">Due Balance</h3>
                    <p className="text-xl font-bold">{dueBalance}</p>
                    <p className="text-gray-500 text-sm">This Month</p>
                </div>
                <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
                    <button
                        onClick={handleClick}
                        className="
                                w-full sm:w-auto
                                px-4 sm:px-8 
                                py-2 sm:py-3
                                rounded-xl
                                font-bold text-white
                                bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400
                                hover:from-emerald-500 hover:via-green-600 hover:to-lime-500
                                active:scale-[0.98]
                                transition-all duration-300
                                shadow-lg hover:shadow-xl
                                transform hover:-translate-y-0.5
                                focus:outline-none focus:ring-4 focus:ring-emerald-300/50
                                relative overflow-hidden
                                group cursor-pointer
                            "
                    >
                        <h1><GiMoneyStack />Add Balance</h1>
                    </button>
                </div>
            </div>

        </>
    );
};

export default Acount;
