import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ProfileImg from "../../img/Curly hair-pana.png";
import "../../styles/FormsImgs.css";

export const MyProfile = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className=" container mt-2 p-3 justify-content-center">
			<h3 className="text-center">Mi Perfil</h3>

			<form className="p-2">
				<div className="name d-flex">
					<img src={ProfileImg} class="profileImg img-fluid col-1" />
					<div className="ms-2 col-3 mt-3">
						<label for="inputFirstName" className="form-label fw-bold">Nombre</label>
						<div>
							<p className="text-dark">Rocio</p>
						</div>
					</div>
					<div className="ms-2 col-3 mt-3">
						<label for="inputFirstName" className="form-label fw-bold">Apellidos</label>
						<div>
							<p className="text-dark">Santos</p>
						</div>
					</div>
					<div className="ms-4 col-5 mt-3">
						<label for="inputEmail" className="form-label fw-bold">Email</label>
						<div>
							<p className="text-dark">rociosantos96@gmail.com</p>
						</div>
					</div>
				</div>

				<div className="d-flex">
					<div className="m-1 col-4">
						<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Que es lo que buscas?</label>

						<select className="form-select " aria-label="Default select example">
							<option selected>Que buscas?</option>
							<option value="1"> Tengo piso y busco roomie</option>
							<option value="2">Busco roomie con piso</option>
						</select>
					</div>
					<div className="m-1 col-4">
						<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Cual es tu presupuesto?</label>
						<select className="form-select" aria-label="Default select example">
							<option selected> Elige tu Presupuesto</option>
							<option value="1">Hasta 300</option>
							<option value="2">Hasta 500</option>
							<option value="2">Hasta 700</option>
						</select>
					</div>
					<div className="m-1 col-4">
						<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Tienes mascota</label>
						<select className="form-select  " aria-label="Default select example">
							<option selected>Tienes mascota?</option>
							<option value="1">Si</option>
							<option value="2">No</option>
						</select>
					</div>
				</div>
				<div className="d-flex">
					<div className="m-1 col-4">
						<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Genero</label>

						<select className="form-select " aria-label="Default select example">
							<option selected>Selecciona te genero</option>
							<option value="1">Mujer</option>
							<option value="2">Hombre</option>
						</select>
					</div>
					<div className="m-1 col-4">
					<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Ubicacion</label>
					<select className="form-select " aria-label="Default select example">
						<option selected>Selecciona tu Ubicacion</option>
						<option value="1">API</option>
						<option value="2">API</option>
						<option value="2">API</option>
					</select>
					</div>
					
					<div className="m-1 col-4">
						<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Por que serias el compi ideal?</label>
						<textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
					</div>
				</div>
				<div className="d-flex justify-content-center">
					<button type="button" className="btn btn-dark me-2">Editar Perfil</button>
					<button type="button" className="btn btn-dark">Cambiar Contrasena</button>
				</div>


			</form>
		</div>
	);
};
