import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import appFirebase from '../credenciales';
import { getFirestore, doc, updateDoc,  getDocs, deleteDoc, getDoc, setDoct} from 'firebase/firestore';
import { useEffect, useState } from 'react';

const db = getFirestore(appFirebase);

export default function EditProduct(props) {
  const [editedProduct, setEditedProduct] = useState({ nombre: '', color: '', precio: 0 });

  useEffect(() => {
    // Cargar los datos del producto al iniciar la vista
    const getOneProduct = async () => {
      try {
        const docRef = doc(db, 'productos', props.route.params.productoId);
        const docSnap = await getDoc(docRef);
        const productData = docSnap.data();
        if (productData) {
          setEditedProduct(productData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getOneProduct();
  }, []);

  const updateProduct = async () => {
    try {
      const docRef = doc(db, 'productos', props.route.params.productoId);
      await updateDoc(docRef, editedProduct);
      Alert.alert('Éxito', 'Producto actualizado con éxito');
      props.navigation.navigate('List');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar el producto');
    }
  }

  return (
    <View>
      <Text style={styles.titulo}>Editar producto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={editedProduct.nombre}
        onChangeText={(text) => setEditedProduct({ ...editedProduct, nombre: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Color"
        value={editedProduct.color}
        onChangeText={(text) => setEditedProduct({ ...editedProduct, color: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={editedProduct.stock}
        onChangeText={(text) => {
        setEditedProduct({ ...editedProduct, stock: text });
      }}
    />

      <TouchableOpacity style={styles.BotonLista} onPress={updateProduct}>
        <Text style={styles.TextoNombre}>Guardar Cambios</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 10,
    padding: 5,
    marginTop: 10
  },
  TextoNombre: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white'
  },
  BotonLista: {
    backgroundColor: 'green',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 3,
    padding: 5,
    marginTop: 5
  }
});