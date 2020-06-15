import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { push } from 'connected-react-router'
// import { routes } from "../../utils/constants"

import { InputAdornment } from '@material-ui/core';
import * as S from "./styles"

// import { signup } from '../../actions/user';

function SignupPage() {
    const [formInfo, setFormInfo] = useState({})
    const [hidenPassword, setHidenPassword] = useState(false)
    const [hidenConfirm, setHidenConfirm] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    // const [alert, setAlert] = useState(false)
    const [open, setOpen] = React.useState(false);
    // const dispatch = useDispatch()
    // const goHome = push(routes.home)

    const createNewUser = [
        {
            name: "name",
            label: "Nome",
            placeholder: "Nome e Sobrenome",
            type: "text",
            pattern: "[a-zA-Zà-úÀ-ú ]{3,}",
            title: "O nome do usuário deve conter apenas letras, no mínimo de 3"
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
            pattern: "[0-9]{3,}[.]{1,}[0-9]{3,}[.]{1,}[0-9]{3,}[-]{1,}[0-9]{2,}", // mudar
            title: "Digite seu CPF com pontos e traço.", //mudar
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
                    onClick={() => setHidenPassword(!hidenPassword)}
                    src={hidenPassword
                        ? "https://user-images.githubusercontent.com/45580434/84558424-2842d180-ad09-11ea-8377-cc34a14d02df.png"
                        : "https://user-images.githubusercontent.com/45580434/84558461-60e2ab00-ad09-11ea-9c26-aec40d92e425.png"
                    }
                    alt='password' />
            </InputAdornment>
        }
    ]

    // setIsAdmin(true)
    // fazer um useEffect q verifica se o usuário logado é admin

    const getFormInfo = (e) => {
        const { name, value } = e.target
        setFormInfo({ ...formInfo, [name]: value })
    }

    const sendUserInfo = (e) => {
        e.preventDefault()
        console.log(formInfo)

        // ver como eu fiz a questão do description no back... se não passa é null?
        const { name, email, nickname, password, confirm, description } = formInfo
        const signupData = description
            ? {
                name: name,
                email: email,
                nickname: nickname,
                password: password,
                description: description
            }
            : {
                name: name,
                email: email,
                nickname: nickname,
                password: password
            }
        if (password !== confirm) {
            // alert('Senhas não conferem')
            setOpen(true)
        } else {
            console.log(signupData)
            // dispatch(signup(signupData))
            // lembrar de ir pra home lá
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };



    return (
        <S.SignupWrapper>
            <S.SignupLogo src="https://user-images.githubusercontent.com/45580434/84555007-12291700-acf1-11ea-9b01-91d7f94f0755.png" alt="logo" />

            <S.Text variant="h6" color="textSecondary"> Entrar </S.Text>

            <S.SignupForm onSubmit={sendUserInfo}>

                {createNewUser.map(field => (
                    <S.InputWrapper
                        key={field.name}
                        variant="outlined"
                        margin="normal"
                        label={field.label}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formInfo[field.name]} // || ""
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

                {isAdmin &&
                    <S.InputWrapper
                        name='description'
                        variant="outlined"
                        label="Descrição"
                        // placeholder=''
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

            {open &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                    Senhas não conferem!
                    </Alert>
                </Snackbar>
            }

        </S.SignupWrapper>
    )
}

export default SignupPage
