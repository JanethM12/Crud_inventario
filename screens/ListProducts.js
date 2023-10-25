import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import appFirebase from '../credenciales'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct} from 'firebase/firestore'
import {useEffect, useState } from 'react';

const db = getFirestore(appFirebase)

export default function ListProducts(props) {
    const [lista, setLista] = useState([])

    useEffect(() => {
        const getLista = async()=>{
            try {
                const querySnapshot = await getDocs(collection(db, 'productos'))
                const docs = []
                querySnapshot.forEach((doc)=>{
                    const {nombre, color, stock}=doc.data()
                    docs.push({
                        id:doc.id,
                        nombre,
                        color,
                        stock,
                    })
                })
                setLista(docs);
            }catch (error){
                console.log(error);
            }
        }
        getLista()
    },[lista])

  return (
    <ScrollView>
        <TouchableOpacity style={styles.Boton} onPress={()=>props.navigation.navigate('Create')}>
            <Text style={styles.TextoBoton}>Agregar Productos</Text>
        </TouchableOpacity>
        <View>
            <Text style={styles.TextoTitulo}>Lista de los Productos</Text>
        </View>
        <View>
            {
                lista.map((List)=>(
                    <TouchableOpacity key={List.id} style={styles.BotonLista}
                    onPress={()=>props.navigation.navigate('Show', {productoId:List.id})}>
                        <Text style={styles.TextoNombre}>{List.nombre}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    </ScrollView>   
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Boton:{
    backgroundColor: '#0000FF',
    height: 35,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
  },
  TextoBoton: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  TextoTitulo: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18
  },
  TextoNombre: {
    fontSize: 16,
  },
  BotonLista: {
    backgroundColor: '#DDDDDD',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom:3,
    padding: 5,
  }
});
