import { Car, CarResponse, CarEntry } from "../type";
import axios, { AxiosRequestConfig } from "axios";

const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem("jwt");

    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application.json',
        }
    }
}

// 자동차 조회
export const getCars = async (): Promise<CarResponse[]> => {
    // const token = sessionStorage.getItem("jwt");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, 
        getAxiosConfig());
    return response.data._embedded.cars;
}

// 자동차 삭제
export const deleteCar = async (link: string): Promise<CarResponse> => {
    // const token = sessionStorage.getItem("jwt");
    const response = await axios.delete(link, getAxiosConfig());
    return response.data;
}

// 새 자동차 추가
export const addCar = async (car: Car): Promise<CarResponse> => {
    // const token = sessionStorage.getItem("jwt");
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car,
        getAxiosConfig());
    return response.data;
}

// 자동차 수정
export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
    // const token = sessionStorage.getItem("jwt");
    const response = await axios.put(carEntry.url, carEntry.car, 
        getAxiosConfig());
    return response.data;
}
