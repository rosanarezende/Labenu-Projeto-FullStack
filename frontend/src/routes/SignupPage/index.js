import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setOpen, setMessage } from '../../actions';
import { signupAdministrator, signupBand, signupListening } from "../../actions/users"
import { useUser } from '../../utils/customHooks'

import * as S from "./styles"
import { InputAdornment, MenuItem } from '@material-ui/core';

import Appbar from '../../containers/Appbar';
import Message from '../../components/Message';
import ButtonBack from '../../components/ButtonBack';

function SignupPage() {
    const { userRole } = useUser()
    const [formInfo, setFormInfo] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)
    const [hidenPassword, setHidenPassword] = useState(false)
    const [hidenConfirm, setHidenConfirm] = useState(false)
    const { open } = useSelector(state => state.messages)
    const dispatch = useDispatch()

    const userRoles = [
        { type: "BAND", name: "Banda | Cantor(a)" },
        { type: "PAYING-LISTENER", name: "Ouvinte (plano pago)" },
        { type: "NON-PAYING-LISTENER", name: "Ouvinte (plano gratuito)" }
    ]

    const createNewUser = [
        {
            name: "name",
            label: "Nome",
            placeholder: formInfo?.role !== "BAND" ? "Nome e Sobrenome" : "Nome da banda",
            type: "text",
            pattern: "[a-zA-Zà-úÀ-ú0-9 ]{3,}",
            title: "O nome deve conter apenas letras ou números, no mínimo de 3"
        },
        {
            name: 'email',
            label: "Email",
            placeholder: "email@email.com",
            type: "email"
        },
        {
            name: 'nickname',
            label: "Nickname",
            placeholder: "nickname",
            type: "text",
            pattern: "[a-zA-Z0-9_]{5,}",
            title: "O nickname deve conter no mínimo 5 caracteres (letras, números ou _), sem espaços."
        },
        {
            name: 'password',
            label: "Senha",
            type: hidenPassword ? 'text' : 'password',
            placeholder: isAdmin ? "Mínimo 10 caracteres" : "Mínimo 6 caracteres",
            pattern: isAdmin ? ".{10,}" : ".{6,}",
            title: `Sua senha deve conter no mínimo ${isAdmin ? "10" : "6"} caracteres`,
            endAdornment: <InputAdornment position="end">
                <img
                    onClick={() => setHidenPassword(!hidenPassword)}
                    src={hidenPassword
                        ? "https://user-images.githubusercontent.com/45580434/84558424-2842d180-ad09-11ea-8377-cc34a14d02df.png"
                        : "https://user-images.githubusercontent.com/45580434/84558461-60e2ab00-ad09-11ea-9c26-aec40d92e425.png"
                    }
                    alt='password' />
            </InputAdornment>
        },
        {
            name: 'confirm',
            label: "Confirmar",
            type: hidenConfirm ? 'text' : 'password',
            placeholder: "Confirme a senha anterior",
            pattern: isAdmin ? ".{10,}" : ".{6,}",
            title: `Sua senha deve conter no mínimo ${isAdmin ? "10" : "6"} caracteres`,
            endAdornment: <InputAdornment position="end">
                <img
                    onClick={() => setHidenConfirm(!hidenConfirm)}
                    src={hidenConfirm
                        ? "https://user-images.githubusercontent.com/45580434/84558424-2842d180-ad09-11ea-8377-cc34a14d02df.png"
                        : "https://user-images.githubusercontent.com/45580434/84558461-60e2ab00-ad09-11ea-9c26-aec40d92e425.png"
                    }
                    alt='password' />
            </InputAdornment>
        }
    ]

    useEffect(() => {
        if (userRole === "ADMINISTRATOR") {
            setIsAdmin(true)
        }
    }, [userRole])


    const getFormInfo = (e) => {
        const { name, value } = e.target
        setFormInfo({ ...formInfo, [name]: value })
    }

    const sendUserInfo = (e) => {
        e.preventDefault()
        const { role, name, email, nickname, password, confirm, description } = formInfo
        const selectedRole = isAdmin ? "ADMINISTRATOR" : role
        const signupData = selectedRole === "BAND"
            ? {
                role: selectedRole,
                name: name,
                email: email,
                nickname: nickname,
                password: password,
                description: description
            }
            : {
                role: selectedRole,
                name: name,
                email: email,
                nickname: nickname,
                password: password
            }

        if (password !== confirm) {

            dispatch(setMessage("Senhas não conferem!", "red"))
            dispatch(setOpen(true))
        }
        else {
            if (isAdmin) {
                dispatch(signupAdministrator(signupData))
                setFormInfo({})
            }
            else if (role === "BAND") {
                dispatch(signupBand(signupData))
                setFormInfo({})
            }
            else {
                dispatch(signupListening(signupData))
                setFormInfo({})
            }
        }
    }

    return (
        <>
            {isAdmin && <Appbar />}
            <S.SignupWrapper>
                {!isAdmin
                    ? <>
                        <S.SignupLogo src="https://user-images.githubusercontent.com/45580434/84555007-12291700-acf1-11ea-9b01-91d7f94f0755.png" alt="logo" />
                        <ButtonBack/>
                    </>
                    : <S.MarginTop />
                }

                <S.Text variant="h6" color="textSecondary"> Cadastrar {isAdmin && "Administrador"}</S.Text>

                <S.SignupForm onSubmit={sendUserInfo}>

                    {!isAdmin &&
                        <S.InputWrapper
                            select
                            required
                            key="role"
                            variant="outlined"
                            margin="normal"
                            label="Tipo de usuário"
                            name="role"
                            onChange={getFormInfo}
                            value={formInfo.role || ""}
                        >
                            {userRoles.map(user => <MenuItem value={user.type} key={user.type}>{user.name}</MenuItem>)}
                        </S.InputWrapper>
                    }

                    {createNewUser.map(field => (
                        <S.InputWrapper
                            key={field.name}
                            variant="outlined"
                            margin="normal"
                            label={field.label}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formInfo[field.name] || ""}
                            onChange={getFormInfo}
                            type={field.type}
                            required
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                endAdornment: field.endAdornment,
                                inputProps: {
                                    pattern: field.pattern,
                                    title: field.title
                                }
                            }}
                        />
                    ))}

                    {formInfo?.role === "BAND" &&
                        <S.TextAreaWrapper
                            name='description'
                            variant="outlined"
                            label="Descrição"
                            type='text'
                            value={formInfo.description || ''}
                            onChange={getFormInfo}
                            required
                            InputLabelProps={{ shrink: true }}
                            multiline
                            rows="5"
                        />
                    }

                    <S.ButtonWrapper type='onSubmit' variant="contained" color="primary">
                        Entrar
                </S.ButtonWrapper>

                </S.SignupForm>

                {open && <Message />}

            </S.SignupWrapper>
        </>
    )
}

export default SignupPage
