import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/finder.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ModalFilteredUsers } from "../component/modalFilteredUsers";


const LITERALS = {
    "Male": <i className="fa-solid fa-mars"></i>,
    "Female": <i className="fa-solid fa-venus"></i>,
    "Yes": <i className="fa-solid fa-paw"></i>,
    "No": "",
    "Apartment": "Busco compañero",
    "NoApartment": "Busco habitación",
}
import { PageNotAllowed } from "./PageNotAllowed";

export const Finder = () => {
    const { store, actions } = useContext(Context);
    const initialFilters = {
        find_roomie: "",
        gender: "",
        pet: "",
        budget: "",
        user_name: "",
    };
    const [usersData, setUsersData] = useState([]);
    const [favoriteProfiles, setFavoriteProfiles] = useState([]);
    const [filters, setFilters] = useState(initialFilters)
    const [noProfilesFound, setNoProfilesFound] = useState(false);
    const [filtersActive, setFiltersActive] = useState(false);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [lastName, setLastName] = useState("");

    const theme = createTheme({
        palette: {
            primary: {
                main: '#295f72',
            },
        },
    });


    useEffect(() => {

        actions.getUsersFilter({}).then(data => {
            if (data && data.length) {
                setUsersData(data);
            }

        })
        actions.getFavoriteProfiles().then(data => {
            if (data && data.length) {
                setFavoriteProfiles(data);
            }

        })
    }, []);


    const handleClick = userData => {
        navigate(`/learnmore/${userData.id}`);
    };


    const handleSetFilter = (filter) => {
        if (filter.user_name !== undefined) {
            setSearchValue(filter.user_name);
        }
        if (filter.last_name !== undefined) {
            setLastName(filter.last_name);
        }
        setFilters({ ...filters, ...filter });
    };

    const handleFilteredUsers = () => {
        const filtersToSend = {
            ...filters,
            user_name: searchValue,
            last_name: lastName
        };

        actions.getUsersFilter(filtersToSend).then(data => {
            if (data && data.length) {
                setUsersData(data);
                setFiltersActive(true);
                setNoProfilesFound(false);
            } else {
                setUsersData([]);
                setNoProfilesFound(true);
                setFiltersActive(false);
            }
        });
    };

    const handleResetFilters = () => {
        setFilters(initialFilters); // Vacía los valores de los filtros
        setFiltersActive(false); // Desactiva el estado de filtros activos
        setSearchValue(""); // Vacía el campo de búsqueda
        setLastName("");

        // Llama a la función para obtener todos los usuarios nuevamente
        actions.getUsersFilter({}).then(data => {
            if (data && data.length) {
                setUsersData(data);
                setNoProfilesFound(false);
            }
        });
    };


    const handleModalClose = () => {
        setFilters(initialFilters);
        actions.getUsersFilter({}).then(data => {
            if (data && data.length) {
                setUsersData(data);
                setNoProfilesFound(false);
            }
        });
    };


    const handleAddToFavorites = async (profileId) => {
        try {
            if (store.token) {
                await actions.addFavoriteProfile(profileId);
                console.log("Perfil agregado a favoritos exitosamente");
                // Actualiza la lista de favoritos después de agregar uno nuevo
                const updatedFavoriteProfiles = await actions.getFavoriteProfiles();
                setFavoriteProfiles(updatedFavoriteProfiles);
            } else {
                console.error("Token no disponible. Inicia sesión nuevamente.");
            }
        } catch (error) {
            console.error("Error al agregar a favoritos:", error);
        }
    };

    const handleRemoveFromFavorites = async (profileId) => {
        try {
            if (store.token) {
                await actions.removeFavoriteProfile(profileId);
                console.log("Perfil eliminado de favoritos exitosamente");
                const updatedFavoriteProfiles = await actions.getFavoriteProfiles();
                setFavoriteProfiles(updatedFavoriteProfiles);
            } else {
                console.error("Token no disponible. Inicia sesión nuevamente.");
            }
        } catch (error) {
            console.error("Error al eliminar de favoritos:", error);
        }
    };



    if (!store.token || store.token === "" || store.token === undefined) {
        return <PageNotAllowed />;
    }
    return (
        <ThemeProvider theme={theme}>
            <div className="finder mb-2">
                <div className="containerfinder p-3 mb-5">
                    <ModalFilteredUsers show={noProfilesFound} handleClose={() => setNoProfilesFound(false)} />
                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            <div className="filter sticky-top">
                                <h4>Filtros</h4>
                                <form>
                                    <div className="name">
                                        <h5>Buscar por nombre</h5>
                                        <div className="d-flex">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={lastName}
                                                style={{ display: 'none' }}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="situation">
                                        <h5>¿Qué buscas?</h5>
                                        <select id="find_roomie"
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={filters.find_roomie}
                                            onChange={(e) => handleSetFilter({ 'find_roomie': e.target.value })}>
                                            <option value="None"></option>
                                            <option value="Apartment">Tengo piso, busco roomie</option>
                                            <option value="NoApartment">Busco roomie que tenga piso</option>
                                        </select>
                                    </div>
                                    <hr />
                                    <div className="gender">
                                        <h5>Género</h5>
                                        <select id="gender"
                                            value={filters.gender}
                                            className="form-select" aria-label="Default select example" onChange={(e) => handleSetFilter({ 'gender': e.target.value })}>
                                            <option value=""></option>
                                            <option value="Female">Femenino</option>
                                            <option value="Male">Masculino</option>
                                        </select>
                                    </div>
                                    <hr />
                                    <div className="pet">
                                        <h5>Mascota</h5>
                                        <select id="pet"
                                            value={filters.pet}
                                            className="form-select" aria-label="Default select example" onChange={(e) => handleSetFilter({ 'pet': e.target.value })} >
                                            <option value=""></option>
                                            <option value="Yes">Tengo mascota</option>
                                            <option value="No">No tengo mascota</option>
                                        </select>
                                    </div>
                                    <hr />
                                    <div className="budget">
                                        <h5>Presupuesto</h5>
                                        <select id="budget"
                                            value={filters.budget}
                                            className="form-select" aria-label="Default select example" onChange={(e) => handleSetFilter({ 'budget': e.target.value })}>
                                            <option value=""></option>
                                            <option value="300">Hasta 300</option>
                                            <option value="400">Hasta 400</option>
                                            <option value="500">Hasta 500</option>
                                        </select>
                                    </div>
                                    <hr />
                                </form>
                                <Stack direction="row" spacing={2} className="buttons">
                                    <Button
                                        onClick={filtersActive ? handleResetFilters : handleFilteredUsers}
                                        className={`button ${filtersActive ? "btn-reset" : "btn-apply"}`}
                                        type="button" color="primary" variant="outlined"
                                    >
                                        {filtersActive ? "Restablecer filtros" : "Aplicar filtros"}
                                    </Button>
                                </Stack>
                            </div>
                        </div>
                        <div className="finderbottom col-md-9">
                            <div className="row justify-content-center">
                                {Array.isArray(usersData) &&
                                    usersData.map((userData, index) => (
                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                                            <div className="card shadow-sm">
                                                <div className="image d-flex justify-content-center align-items-center p-1">
                                                    <img
                                                        src={userData.properties?.profile_img}
                                                        alt="Card Image"
                                                        className="profile-image img-fluid rounded-circle" style={{ width: '220px', height: '220px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className="content">
                                                    <div>
                                                        <p>{userData.user_name} {userData.last_name}</p>
                                                        <div className="icons d-flex">
                                                            <p><i className="fa-solid fa-house"></i> {LITERALS[userData.properties?.find_roomie]}</p>
                                                            <p><i className="fa-solid fa-euro-sign"></i> {userData.properties?.budget}</p>
                                                            <p>{LITERALS[userData.properties?.gender]}</p>
                                                            <p>{LITERALS[userData.properties?.pet]}</p>
                                                        </div>
                                                    </div>
                                                    <div className="buttons">
                                                        <div className="d-flex justify-content-between">
                                                            <Stack direction="row" spacing={2} className="buttons">
                                                                <div className="d-grid gap-2 d-md-flex">
                                                                    <Button
                                                                        onClick={() => {
                                                                            handleClick(userData);
                                                                        }}
                                                                        type="button" color="primary" variant="outlined" className="button"
                                                                    >
                                                                        Saber más
                                                                    </Button>
                                                                </div>
                                                            </Stack>

                                                            <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                                                                {
                                                                    favoriteProfiles.find(profile => profile.id === userData.id) ? (
                                                                        <Button
                                                                            onClick={() => handleRemoveFromFavorites(userData.id)}
                                                                            type="button" variant="outlined" className="button"
                                                                        >
                                                                            <i className="fa-solid fa-heart"></i>
                                                                        </Button>
                                                                    ) : (
                                                                        <Button
                                                                            onClick={() => handleAddToFavorites(userData.id)}
                                                                            type="button" variant="outlined" className="button"
                                                                        >
                                                                            <i className="fa-regular fa-heart"></i>
                                                                        </Button>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <ModalFilteredUsers show={noProfilesFound} handleClose={handleModalClose} />
                </div>
            </div >
        </ThemeProvider >
    );

};

