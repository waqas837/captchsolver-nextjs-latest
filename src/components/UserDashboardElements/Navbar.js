import Link from "next/link";
import React from "react";

const Navbar = () => {
  let userToken =  typeof window !== "undefined" &&  localStorage.getItem("userToken");
  // if (!userToken) {
  //   window.location.href =
  //     "/index.html";
  // }
  const logout = () => {
    typeof window !== "undefined" &&   localStorage.removeItem("userToken");
    window.location.reload();
  };

  return (
    <>
      <div className="header-area-one">
        <div className="container-30">
          <div className="col-lg-12">
            <div className="header-inner-one">
              <div className="left-logo-area">
                <Link href="/" className="logo">
                  <img
                    src="/dashboard/assets/images/logo/logo-01.png"
                    alt="logo-image"
                  />
                </Link>
                <div className="left-side-open-clouse" id="collups-left">
                  <img src="/dashboard/assets/images/icons/01.svg" alt="icons" />
                </div>
              </div>
              <div className="header-right">
                <div className="button-area">
                  <button
                    id="add-balance"
                    className="rts-btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                  >
                    Add Balance
                  </button>
                </div>
                <div className="action-interactive-area__header">
                  <div
                    className="single_action__haeader user_avatar__information openuptip"
                    flow="down"
                    tooltip="Profile"
                  >
                    <div className="avatar">
                      <img src="/dashboard/assets/images/avatar/01.png" alt="avatar" />
                    </div>
                    <div className="user_information_main_wrapper slide-down__click">
                      <div className="user_header">
                        <div className="main-avatar">
                          <img
                            src="/dashboard/assets/images/avatar/user-2.svg"
                            alt="user"
                          />
                        </div>
                        <div className="user_naim-information">
                          <h3 id="usernamehere" className="title">
                            ...
                          </h3>
                        </div>
                      </div>

                      <div className="popup-footer-btn">
                        <button
                          onClick="logout()"
                          className="geex-content__header__popup__footer__link"
                        >
                          Logout
                          <i className="fa-light fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Navbar;
