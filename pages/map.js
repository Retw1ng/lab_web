
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import React, { useEffect, useState } from 'react';


const Mapp = ({ apiKey }) => {
    const [map, setMap] = useState(null);
    const [clinics, setClinics] = useState([]);
    const [newClinic, setNewClinic] = useState({
        name: '',
        lat: null,
        lng: null,
        address: '',
    });
    const [newLocation, setNewLocation] = useState('');
    useEffect(() => {
        async function loadClinicsFromServer() {
            try {
                const response = await fetch('/api/getClinics');
                response?.text().then(v=>{

                    setClinics(JSON.parse(v))
                })

            } catch (error) {
                console.error('Ошибка при загрузке клиник:', error);
            }
        }
        loadClinicsFromServer()
    }, []);

    console.log(clinics)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClinic({
            ...newClinic,
            [name]: value,
        });
    };

    const handleLocationChange = (e) => {
        setNewLocation(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!coordinate)
            return
        const location = {
            name:e.target[0].value,
            lat : coordinate[0],
            lng : coordinate[1]
        }
        addClinic(location);

    };

    const addClinic = async (clinic) => {
        try {
            const response = await fetch('/api/clinics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clinic),
            });

            setCoordinate(null)
                setClinics([...clinics, clinic]);
        } catch (error) {
            console.error('Ошибка при добавлении клиники1:', error);
        }
    };


    const [coordinate, setCoordinate] = useState(null)
    return (
        <div>
            <YMaps  query={{ apikey: 'c8e6b5c9-a3f4-4661-b3cf-19a98a30f154' }}>
                <div style={{height:'400px', width:'1000px', paddingLeft:'200px'}}>
                    <Map width="100%" height="100%"
                         onClick={(e) => {
                             const coords = e.get("coords");
                             console.log(coords)
                             setCoordinate(coords);
                         }}
                         state={{center: [55.751574, 37.573856], zoom: 13}}>
                        {clinics.map(clinic=> <Placemark key={JSON.stringify([clinic.lat, clinic.lng])} geometry={[clinic.lat, clinic.lng]}/>)}
                        {coordinate&&<Placemark geometry={coordinate} pinColor='#FFfff0'/>}
                    </Map>
                </div>
            </YMaps>

            <form style={{paddingTop:'50px', paddingLeft:'400px'}} onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Название" value={newClinic.name} onChange={handleInputChange}
                   required/>
            <button type="submit">Добавить клинику</button>
        </form>
</div>
)
    ;
};

export default Mapp;