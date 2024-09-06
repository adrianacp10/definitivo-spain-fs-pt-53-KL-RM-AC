import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/MyProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { CreateProfile } from "./CreateProfile";
import { PageNotAllowed } from "./PageNotAllowed";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const LITERALS = {
    "Male": "Hombre",
    "Female": "Mujer",
    "Yes": "Tengo mascota",
    "No": "No tengo mascota",
    "Apartment": "Busco rommie",
    "NoApartment": "Busco habitación",
}

export const MyProfile = () => {
    const { store, actions } = useContext(Context);
    const userData = {
        user_name: store.user_name,
        last_name: store.last_name,
        pet: store.pet,
        gender: store.gender,
        email: store.email,
        budget: store.budget,
        find_roomie: store.find_roomie,
        text_box: store.text_box,
        profile_img: store.profile_img,
    };


    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primary: {
                main: '#295f72',
            },
        },
    });

    useEffect(() => {
        setLoading(false); // Cuando el componente se monta, deja de mostrar el estado de carga
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                await actions.getProfile();
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener perfil:", error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);
    console.log(userData)

    const handleDelete = async () => {
        try {
            setLoading(true); // Activar indicador de carga
            await actions.deleteUserProperties();
            navigate("/homelogged"); // Redirigir a la página de inicio de sesión después de eliminar propiedades
        } catch (error) {
            console.error("Error al eliminar propiedades del usuario:", error);
        } finally {
            setLoading(false); // Desactivar indicador de carga independientemente del resultado
        }
    };

    const hasRequiredFields = () => {
        return (
            userData.pet !== null && userData.pet !== "" &&
            userData.gender !== null && userData.gender !== "" &&
            userData.budget !== null && userData.budget !== "" &&
            userData.find_roomie !== null && userData.find_roomie !== "" &&
            userData.text_box !== null && userData.text_box !== "" &&
            userData.profile_img !== null && userData.profile_img !== ""
        );
    };

    if (!store.token || store.token === "" || store.token === undefined) {
        return <PageNotAllowed />;
    } else if (loading) {
        return (
            <ThemeProvider theme={theme}>
                <div className="spinner-container">
                    <div className="spinner">
                        <CircularProgress color="primary" />
                    </div>
                </div>
            </ThemeProvider>
        );
    } else if (!hasRequiredFields()) {
        return (
            <div>
                <CreateProfile />
            </div>
        );
    }
    else {

        return (
            <ThemeProvider theme={theme}>
                <div className="nuevo d-flex mt-5">
                    <div className="myprofile container mt-4 p-3 d-flex justify-content-center align-items-center mt-5">
                        <div className="postal-myprofile d-flex justify-content-center align-items-center">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-center align-items-center p-1">
                                    <img src={userData.profile_img} className="profile-image img-fluid rounded-circle" alt="Profile" style={{ width: '320px', height: '320px', objectFit: 'cover' }} />
                                </div>
                                <div className="col-md-6 user-info">
                                    <h3 className="text-center">Mi perfil </h3>
                                    <hr />
                                    <p><strong>Nombre:</strong> {userData.user_name} {userData.last_name}</p>
                                    <p><strong>Email:</strong> {userData.email}</p>
                                    <p><i className="fa-solid fa-venus-mars"></i><strong> Género:</strong> {LITERALS[userData.gender]}</p>
                                    <p><i className="fa-solid fa-paw"></i><strong> Tienes mascota:</strong> {LITERALS[userData.pet]}</p>
                                    <p><i className="fa-solid fa-euro-sign"></i><strong> Presupuesto:</strong> {userData.budget}</p>
                                    <p><strong>¿Qúe buscas?:</strong> {LITERALS[userData.find_roomie]}</p>
                                    <p><strong>¿Por qué serías el compañero ideal?</strong></p>
                                    <div className="ideal-companion">
                                        <p>{userData.text_box}</p>
                                    </div>
                                    <Stack direction="row" spacing={2} className="buttons">
                                        <Link to={"/edit"} style={{ textDecoration: 'none' }}>
                                            <Button type="button" color="primary" variant="outlined" className="button p-2">Editar Perfil</Button>
                                        </Link>

                                        <Button type="button" color="primary" variant="outlined" className="button btn" onClick={handleDelete}>Eliminar Perfil</Button>

                                        <Link to={"/password"} style={{ textDecoration: 'none' }}>
                                            <Button type="button" color="primary" variant="outlined" className="button btn">Cambiar Contrasena</Button>
                                        </Link>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </ThemeProvider>
        );
    }
};