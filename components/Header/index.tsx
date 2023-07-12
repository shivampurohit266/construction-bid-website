import React, { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import {
  getLanguagePrefix,
  localizedPagePath,
  setUiLanguage,
  useLocalization,
  getUiLanguage,
} from "../../utils/localization";
import { cn } from "../../utils/cn";
import { LoginButton } from "../../components/CallToAction/LoginButton";
import { SignUpButton } from "../../components/CallToAction/SignupButton";
import Logo from "../../images/Full-Logo-lighter.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [t] = useLocalization();
  const router = useRouter();
  // console.log(router);
  return (
    <>
      <div
        className={cn(
          "proppu-header-wrapper",
          isMenuOpen ? "header__mobile-menu-active" : " "
        )}
      >
        <header className="proppu-header header-animation">
          {["md"].map((expand) => (
            <Navbar key={expand} expand={expand} className="">
              <Container fluid>
                <Link
                  aria-label="Go to homepage"
                  className="proppu-header__logo"
                  href={getLanguagePrefix("/")}
                >
                  <Image
                    loading="eager"
                    src={Logo}
                    height="45"
                    width="197"
                    alt="Proppu logo"
                  />
                </Link>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                  className="overflow-x-hidden"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      <Image
                        loading="eager"
                        src={Logo}
                        height="45"
                        width="130"
                        alt="Proppu logo"
                      />
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body style={{height:"100%"}}>
                    <div className="mobile_header_box">
                      <div
                        className={cn(
                          "proppu-header-wrapper",
                          isMenuOpen ? "header__mobile-menu-active" : " "
                        )}
                      >
                        <div className="header_link_box">
                          <ul className="header__secondaryLinks">
                            <li>
                              <Link
                                href={getLanguagePrefix("/what-is-proppu/")}
                                className={
                                  router.pathname == "/what-is-proppu"
                                    ? "active"
                                    : ""
                                }
                              >
                                {t("header.links.whatIsProppu")}
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={getLanguagePrefix("/pricing/")}
                                className={
                                  router.pathname == "/coming-soon"
                                    ? "active"
                                    : ""
                                }
                              >
                                {t("header.links.pricing", "Pricing")}
                              </Link>
                            </li>
                            <div className="mobile_header_secondlist_box">
                              <div className="sign_in_up_box">
                                <li>
                                  <LoginButton />
                                </li>
                                <li>
                                  <SignUpButton />
                                </li>
                              </div>
                              <div className="language_box">
                                <li>
                                  <div
                                    className="header__links__dropdown-item"
                                    style={{
                                      border: "1px solid #E2E2E2",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <div>
                                      <FaGlobe />
                                      {getUiLanguage() === "english"
                                        ? " English"
                                        : ""}
                                      {getUiLanguage() === "finnish"
                                        ? " Finnish"
                                        : ""}
                                      {getUiLanguage() === "spanish"
                                        ? " Spanish"
                                        : ""}
                                      {" \u25bc"}
                                    </div>

                                    <ul
                                      className="header__links__dropdown"
                                      style={{ width: "102px" }}
                                    >
                                      <div className="header__spacer"></div>
                                      <li>
                                        <Link
                                          onClick={() =>
                                            setUiLanguage("finnish")
                                          }
                                          href={router.asPath}
                                        >
                                          {getUiLanguage() === "finnish" ? (
                                            <strong>FI</strong>
                                          ) : (
                                            "FI"
                                          )}
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          onClick={() =>
                                            setUiLanguage("english")
                                          }
                                          href={router.asPath}
                                        >
                                          {getUiLanguage() === "english" ? (
                                            <strong>EN</strong>
                                          ) : (
                                            "EN"
                                          )}
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          onClick={() =>
                                            setUiLanguage("spanish")
                                          }
                                          href={router.asPath}
                                        >
                                          {getUiLanguage() === "spanish" ? (
                                            <strong>ES</strong>
                                          ) : (
                                            "ES"
                                          )}
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                              </div>
                            </div>
                          </ul>
                          <div className="header__spacer"></div>

                          <ul className="header__links">
                            <li
                              className="header__links__dropdown-item"
                              style={{ cursor: "pointer" }}
                            >
                              <Link
                                href={router.asPath}
                                className={
                                  router.pathname ==
                                    "/construction-companies" ||
                                  router.pathname ==
                                    "/professional-enterpreneur" ||
                                  router.pathname == "/material-suppliers"
                                    ? "active"
                                    : ""
                                }
                              >
                                {t("header.links.professionals")}
                                {" \u25bc"}
                              </Link>
                              <ul className="header__links__dropdown">
                                <li>
                                  <Link
                                    href={getLanguagePrefix(
                                      "/construction-companies/"
                                    )}
                                    className={
                                      router.pathname ==
                                      "/construction-companies"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("header.links.construction-companies")}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={getLanguagePrefix(
                                      "/professional-enterpreneur/"
                                    )}
                                    className={
                                      router.pathname ==
                                      "/professional-enterpreneur"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("header.links.entrepreneur")}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={getLanguagePrefix(
                                      "/material-suppliers/"
                                    )}
                                    className={
                                      router.pathname == "/material-suppliers"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("header.links.material-suppliers")}
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <Link
                                href={getLanguagePrefix("/consumers/")}
                                className={
                                  router.pathname == "/consumers"
                                    ? "active"
                                    : ""
                                }
                              >
                                {t("header.links.consumers")}
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={getLanguagePrefix("/condominium/")}
                                className={
                                  router.pathname == "/condominium"
                                    ? "active"
                                    : ""
                                }
                              >
                                {t("header.links.condominium")}
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={getLanguagePrefix("/contact-us/")}
                                className={
                                  router.pathname == "/contact-us"
                                    ? "active"
                                    : ""
                                }
                              >
                                {t("header.links.contact-us")}
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={getLanguagePrefix("/renovate/")}
                                className={
                                  router.pathname == "/renovate" ? "active" : ""
                                }
                              >
                                {t("header.links.consumer")}
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={getLanguagePrefix("/blog/")}
                                className={
                                  router.pathname == "/blog" ? "active" : ""
                                }
                              >
                                {t("header.links.blog")}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}

          <ul className="header__secondaryLinks">
            <li>
              <Link
                href={getLanguagePrefix("/what-is-proppu/")}
                className={router.pathname == "/what-is-proppu" ? "active" : ""}
              >
                {t("header.links.whatIsProppu")}
              </Link>
            </li>
            <li>
              <Link
                href={getLanguagePrefix("/pricing/")}
                className={router.pathname == "/coming-soon" ? "active" : ""}
              >
                {t("header.links.pricing", "Pricing")}
              </Link>
            </li>
            <li>
              <LoginButton />
            </li>
            <li>
              <SignUpButton />
            </li>
            <li>
              <div
                className="header__links__dropdown-item"
                style={{ border: "1px solid #E2E2E2", cursor: "pointer" }}
              >
                <div>
                  <FaGlobe />
                  {getUiLanguage() === "english" ? " English" : ""}
                  {getUiLanguage() === "finnish" ? " Finnish" : ""}
                  {getUiLanguage() === "spanish" ? " Spanish" : ""}
                  {" \u25bc"}
                </div>

                <ul
                  className="header__links__dropdown"
                  style={{ width: "102px" }}
                >
                  <div className="header__spacer"></div>
                  <li>
                    <Link
                      onClick={() => setUiLanguage("finnish")}
                      href={router.asPath}
                    >
                      {getUiLanguage() === "finnish" ? (
                        <strong>FI</strong>
                      ) : (
                        "FI"
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setUiLanguage("english")}
                      href={router.asPath}
                    >
                      {getUiLanguage() === "english" ? (
                        <strong>EN</strong>
                      ) : (
                        "EN"
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setUiLanguage("spanish")}
                      href={router.asPath}
                    >
                      {getUiLanguage() === "spanish" ? (
                        <strong>ES</strong>
                      ) : (
                        "ES"
                      )}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className="header__spacer"></div>

          <ul className="header__links">
            <li
              className="header__links__dropdown-item"
              style={{ cursor: "pointer" }}
            >
              <Link
                href={router.asPath}
                className={
                  router.pathname == "/construction-companies" ||
                  router.pathname == "/professional-enterpreneur" ||
                  router.pathname == "/material-suppliers"
                    ? "active"
                    : ""
                }
              >
                {t("header.links.professionals")}
                {" \u25bc"}
              </Link>
              <ul className="header__links__dropdown">
                <li>
                  <Link
                    href={getLanguagePrefix("/construction-companies/")}
                    className={
                      router.pathname == "/construction-companies"
                        ? "active"
                        : ""
                    }
                  >
                    {t("header.links.construction-companies")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={getLanguagePrefix("/professional-enterpreneur/")}
                    className={
                      router.pathname == "/professional-enterpreneur"
                        ? "active"
                        : ""
                    }
                  >
                    {t("header.links.entrepreneur")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={getLanguagePrefix("/material-suppliers/")}
                    className={
                      router.pathname == "/material-suppliers" ? "active" : ""
                    }
                  >
                    {t("header.links.material-suppliers")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href={getLanguagePrefix("/consumers/")}
                className={router.pathname == "/consumers" ? "active" : ""}
              >
                {t("header.links.consumers")}
              </Link>
            </li>
            <li>
              <Link
                href={getLanguagePrefix("/condominium/")}
                className={router.pathname == "/condominium" ? "active" : ""}
              >
                {t("header.links.condominium")}
              </Link>
            </li>
            <li>
              <Link
                href={getLanguagePrefix("/contact-us/")}
                className={router.pathname == "/contact-us" ? "active" : ""}
              >
                {t("header.links.contact-us")}
              </Link>
            </li>
            <li>
              <Link
                href={getLanguagePrefix("/renovate/")}
                className={router.pathname == "/renovate" ? "active" : ""}
              >
                {t("header.links.consumer")}
              </Link>
            </li>
            <li>
              <Link
                href={getLanguagePrefix("/blog/")}
                className={router.pathname == "/blog" ? "active" : ""}
              >
                {t("header.links.blog")}
              </Link>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
};

export default Header;
