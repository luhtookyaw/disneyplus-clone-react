import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState } from '../features/user/userSlice';
import { auth, signInWithPopup, provider } from '../firebase';

const Header = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                setUser(user);
                navigate("/home");
            }
        })
    }, [userName]);

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        );
    }

    const handleAuth = () => {
        if (!userName) {
            signInWithPopup(auth, provider)
            .then((result) => { 
                setUser(result.user);
            })
            .catch((error) => {
                alert(error.message);
            });
        } else {
            auth.signOut()
                .then(() => {
                    dispatch(setSignOutState());
                    navigate("/");
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    }
    return (
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="Disney+" />
            </Logo>
            {   
                !userName ? 
                <LoginButton onClick={handleAuth}>
                    LOGIN
                </LoginButton> :
                <>
                <NavMenu>
                    <a href="/home">
                        <img src="/images/home-icon.svg" alt="HOME"/>
                        <span>HOME</span>
                    </a>
                    <a href="#">
                        <img src="/images/search-icon.svg" alt="HOME"/>
                        <span>SEARCH</span>
                    </a>
                    <a href="#">
                        <img src="/images/watchlist-icon.svg" alt="HOME"/>
                        <span>WATCHLIST</span>
                    </a>
                    <a href="#">
                        <img src="/images/original-icon.svg" alt="HOME"/>
                        <span>ORIGINAL</span>
                    </a>
                    <a href="#">
                        <img src="/images/movie-icon.svg" alt="HOME"/>
                        <span>MOVIES</span>
                    </a>
                    <a href="#">
                        <img src="/images/series-icon.svg" alt="HOME"/>
                        <span>SERIES</span>
                    </a>
                </NavMenu>
                <SignOut>
                    <UserImg src={userPhoto} alt={userName} />
                    <DropDown>
                        <span onClick={handleAuth}>Sign Out</span>
                    </DropDown>
                </SignOut>
                </>
            }
        </Nav>
    );
}

const Nav = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 70px;
    background-color: #090b13;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 1.08px;
    z-index: 1;
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    display: inline-block;
`;

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    position: relative;
    margin-right: auto;
    margin-left: 25px;
    
    a {
        display: flex;
        align-items: center;
        padding: 0 12px;

        img {
            height: 20px;
            min-width: 20px;
            width: 20px;
        }
        span {
            position: relative;
            color: rgb(249, 249, 249);
            font-size: 15px;
            padding: 2px 7px;

            &:before {
            content: "";
            background-color: rgb(249, 249, 249);
            border-radius: 0px 0px 4px 4px;
            bottom: -6px;
            height: 2px;
            left: 0;
            position: absolute;
            right: 0px;
            transform-origin: left center;
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            visibility: hidden;
            width: auto;
            }
        }

        &:hover {
            span:before {
                transform: scaleX(1);
                visibility: visible;
            }
        }
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const LoginButton = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;

const UserImg = styled.img`
    width: 40px;
    border-radius: 100px;

`;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 2px;
    width: 100px;
    margin-right: 12px;
    cursor: pointer;
    visibility: hidden;
`;

const SignOut = styled.div`
    &:hover {
        ${DropDown} {
            visibility: visible;
            transition-duration: 1s;
        }
    }
`;


export default Header;