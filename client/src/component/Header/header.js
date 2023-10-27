import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { FaTicketAlt } from "react-icons/fa";
import { useState } from "react";
import Modal from "react-modal";
import  axios  from "axios";
import { setCookie, getCookie, removeCookie } from "../../useCookies";

function Header() {
  const navigate = useNavigate();

  let [modalIsOpen, setModalIsOpen] = useState(false);
  let [zIndex, setZindex] = useState(1);

  const onLogin = (e) => {
    e.preventDefault();
    const id = e.target.user_id.value;
    const pwd = e.target.user_pwd.value;
    console.log('test',id,pwd);
    if (id === "" ||pwd === "") {
      return alert('아이디 또는 비밀번호를 입력해주세요')
    }else{
      axios.post('/login',{id,pwd})
      .then(()=>{
        console.log("로그인성공");
        setModalIsOpen(false);
        setCookie("login",id)
      })
      .catch((error)=>{
        console.error(error);
        return alert("로그인 실패")
      })
    }
  }
  const Logout = (e)=>{
    e.preventDefault();
    removeCookie("login")
    navigate('/');
  }

  return (
    <>
      <div className="title">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="hello">
            <span className="titleIcon">
              <FaTicketAlt />
            </span>
            Hello<span className="kiticket">Kiticket</span>
          </div>
        </Link>
        <div className="titleInputBox">
          <input placeholder="어떤 공연을 보고 싶으세요?"></input>
          <span className="serchIcon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
        {getCookie("login") ? (
          <div className="navLogin">
            {getCookie("login")} 님
              <button onClick={Logout}>로그아웃</button>
          </div>
        ) : (
          <div className="navLogin">
            <Link
              className="loginBtn"
              style={{ textDecoration: "none" }}
              onClick={() => {
                setModalIsOpen(true);
                setZindex(0);
              }}
            >
              로그인
            </Link>
            /
            <Link
              className="registerBtn"
              to="/register"
              style={{ textDecoration: "none" }}
            >
              회원가입
            </Link>
          </div>
        )}
        <Modal
          className="loginModal"
          isOpen={modalIsOpen}
          bodyOpenClassName="modal-open"
          onRequestClose={() => {
            setModalIsOpen(false);
            setZindex(1);
          }}
        >
          <form onSubmit={onLogin}>
            <div
              className="loginCloseBtn"
              onClick={() => {
                setModalIsOpen(false);
                setZindex(1);
              }}
            >
              X
            </div>
            <div className="mainTitle">로그인</div>
            <div className="loginInputBox">
              <input id="user_id" type="text" placeholder="ID" />
              <input id="user_pwd" type="password" placeholder="PASSWORD"></input>
            </div>
            <div className="loginBtnBox">
              <button type='submit'>로그인</button>
            </div>
            <div className='registerHelp'>
              계정이 없으신가요?
              <Link
                className="registerBtn"
                to="/register"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  setModalIsOpen(false)}
                }
              >
                회원가입
              </Link>
            </div>
          </form>
        </Modal>
      </div>

      <div className="menuNav" style={{ zIndex: zIndex }}>
        <div className="menu SMNEffect21">
          <Link to="/">홈</Link>
        </div>
        <div className="menu">
          <Link to="/concert">콘서트</Link>
        </div>
        <div className="menu">
          <Link to="/musical">뮤지컬</Link>
        </div>
        <div className="menu">
          <Link to="/classic">클래식</Link>
        </div>
        <div className="menu">
          <Link to="/exhibition">전시회</Link>
        </div>
        <div className="menu">
          <Link to="/theme">테마</Link>
        </div>
        <div className="menu">
          <Link to="/ranking">랭킹</Link>
        </div>
        <div className="lastmenu">
          <Link to="/event">공지사항</Link>
        </div>
      </div>
    </>
  );
}

export default Header;
