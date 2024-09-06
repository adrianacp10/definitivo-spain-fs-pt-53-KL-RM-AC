import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/createProfile.css";
import { Link } from "react-router-dom";
import { MyProfile } from "./MyProfile";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomAlert from "./Alerts";
import CircularProgress from '@mui/material/CircularProgress';


export const CreateProfile = () => {
    const { store, actions } = useContext(Context);
    const [alertMessage, setAlertMessage] = useState("");
    const [formData, setFormData] = useState({
        pet: "",
        gender: "",
        budget: "",
        find_roomie: "",
        text_box: "",
        profile_img: null // Inicialmente, establece la imagen como nula
    });
    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [profileCreated, setProfileCreated] = useState(false);
    const [open, setOpen] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(false);
            try {
                await actions.getUserDetails(store);

                setUserData(store);
            } catch (error) {
                console.error('Error al obtener los detalles del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNewImage = async (e) => {
        const image = e.target.files[0];
        setImage(image);
        const formDataImage = new FormData();
        formDataImage.append("file", image);
        formDataImage.append("upload_preset", "wegw5toq");
        try {
            setUploadingImage(true); // Establece el estado de carga de la imagen a true
            const response = await fetch(process.env.BACKEND_URL_CLOUDINARY + 'image/upload',
                {
                    method: "POST",
                    body: formDataImage,
                }
            );
            const data = await response.json();
            setFormData({
                ...formData,
                profile_img: data.secure_url // Actualiza el estado con la URL de la imagen cargada
            });
            setImageUploaded(true);
        } catch (error) {
            setImageUploaded(false);
            console.error("Error al cargar la imagen:", error);
        } finally {
            setUploadingImage(false); // Restablece el estado de carga de la imagen a false una vez que se complete la carga
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.pet || !formData.gender || !formData.budget || !formData.find_roomie || !formData.text_box || !imageUploaded) {
            setAlertMessage("Por favor, completa todos los campos antes de enviar el formulario.");
            setOpen(true);
            return;
        }
        try {
            await actions.addProfileInfo(formData);
            setProfileCreated(true);
            setAlertMessage("Perfil creado correctamente")
            setOpen(true) // Indicar que el perfil se ha creado correctamente
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setAlertMessage("Error al guardar perfil");
            setOpen(true)
        }
    };


    const theme = createTheme({
        palette: {
            primary: {
                main: '#295f72',
            },
        },
    });


    if (loading) {
        return (
            <ThemeProvider theme={theme}>
                <div className="spinner-container">
                    <div className="spinner">
                        <CircularProgress color="primary" />
                    </div>
                </div>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="createProfile">
                {profileCreated ? <MyProfile /> : (
                    <div className="createProfilePage">
                        <form>
                            <div className="row">
                                <div className="col-md-6 col-sm-12 images">
                                    <div className="profileImg">
                                        {image ? (
                                            <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-img img-fluid" />
                                        ) : (
                                            <img src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg" alt="Placeholder" className="placeholder-img img-fluid" />
                                        )}
                                    </div>
                                    <input
                                        id="fileInput"
                                        name="profile_img"
                                        type="file"
                                        hidden // Oculta el input
                                        onChange={handleNewImage}

                                    />
                                    <label htmlFor="fileInput" className="labelImg mt-3">
                                        {uploadingImage ? <CircularProgress color="primary" /> : <CloudUploadIcon />}                                        </label>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <h3 className="text-center">Crear Perfil</h3>
                                    <hr />
                                    <div className="nameCreateProfile mb-3">
                                        <p><strong>Nombre:</strong> {userData.user_name} {userData.last_name}</p>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Que buscas?</label>
                                        <select className="form-select" name="find_roomie" value={formData.find_roomie} onChange={handleInputChange} aria-placeholder=" ">
                                            <option value="">Selecciona una opción</option>
                                            <option value="Apartment">Tengo piso y busco roomie</option>
                                            <option value="NoApartment">Busco roomie con piso</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Presupuesto?</label>
                                        <div className="input-group">
                                            <span className="input-group-text presupuesto">€</span>
                                            <input
                                                type="number"
                                                className="form-control presupuesto"
                                                id="budget"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleInputChange}
                                                inputMode="numeric" // Indica que es un campo numérico
                                                aria-label="Presupuesto en euros"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Tienes mascota</label>
                                        <select className="form-select" name="pet" value={formData.pet} onChange={handleInputChange}>
                                            <option value="">Tienes mascota?</option>
                                            <option value="Yes">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Genero</label>
                                        <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange}>
                                            <option value="">Selecciona tu género</option>
                                            <option value="Female">Mujer</option>
                                            <option value="Male">Hombre</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Por que serias el compi ideal?</label>
                                        <textarea
                                            className="form-control text"
                                            id="exampleFormControlTextarea1"
                                            rows="2"
                                            value={formData.text_box}
                                            onChange={handleInputChange}
                                            name="text_box"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <Stack direction="row" spacing={2} className="buttons">
                                <Button onClick={handleSubmit} type="submit" color="primary" variant="outlined" className="button" disabled={!imageUploaded} >
                                    Continuar
                                </Button>
                                <CustomAlert open={open} onClose={handleClose} message={alertMessage} severity={alertMessage === "Perfil creado correctamente" ? "success" : "error"} />
                                <Link to={"/password"}>
                                    <Button type="button" color="primary" variant="outlined" className="button">Cambiar Contrasena</Button>
                                </Link>
                            </Stack>
                        </form>
                    </div>)}
            </div>
        </ThemeProvider>

    );
};
