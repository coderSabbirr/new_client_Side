import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BiMoneyWithdraw, BiSupport } from "react-icons/bi";
import { FaBars, FaDollarSign } from "react-icons/fa";
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { NavLink, useRouteMatch } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useFirebase from "../../Hook/useFirebase";
import Dashboard2 from "./Dashboard2";

const SideBar = ({ children }) => {
  let { path, url } = useRouteMatch();
  const { user } = useAuth();
  const { logOut } = useFirebase();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  console.log(path, url);
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <div className="grid-container">
          <div className="item1">
            <motion.div
              animate={{
                width: isOpen ? "200px" : "45px",

                transition: {
                  duration: 0.5,
                  type: "spring",
                  damping: 10,
                },
              }}
              className={`sidebar `}
            >
              <div className="top_section">
                <AnimatePresence>
                  {isOpen && (
                    <motion.h1
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="logo"
                    >
                      User Dashboard
                    </motion.h1>
                  )}
                </AnimatePresence>
                <br />

                <div className="bars">
                  <FaBars onClick={toggle} />
                </div>
              </div>

              <section className="routes">
                <NavLink
                  to={"/dashboard"}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon"></div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {user.email}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
                <NavLink
                  to={`${url}/myorder`}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">
                    {" "}
                    <MdDashboard />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        Dashboard
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
                <NavLink
                  to={"/deposit"}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">
                    {" "}
                    <FaDollarSign />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        Deposit
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
                <NavLink
                  to={"/withdraw"}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">
                    {" "}
                    <BiMoneyWithdraw />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        Withdraw
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
                <NavLink
                  to={`${url}/orderslist`}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">
                    {" "}
                    <BiSupport />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        Order List
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
                <NavLink
                  to={`/dashboard2`}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">
                    {" "}
                    <IoMdSettings />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        My Order
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>

                <NavLink to={".."} className="link" activeClassName="active">
                  <div className="icon">
                    {" "}
                    <IoIosLogOut />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                        onClick={logOut}
                      >
                        Logout
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              </section>
            </motion.div>
          </div>
          <div className="item1">
            <Dashboard2 />
          </div>
        </div>

        {/* <main>
          
        </main> */}
      </div>
    </>
  );
};

export default SideBar;
