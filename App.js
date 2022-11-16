import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from "@expo/vector-icons";


function Vendedor({ route }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idsearch, setIdSearch] = useState("");
  const [username, setUsername] = useState("")
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("")
  const [correo, setCorreo] = useState("")
  const [comision, setComision] = useState("")

const getVendedorById = async (id) => {
  try{
    const url = `http://172.16.63.73:3000/api/clientes/${id}`;
    const response = await axios.get(url);
    setData(response.data.nombre)
    setData(response.data.correo)
    setData(response.data.comision)
    setData(response.data.idsearch)
    //setNombre(response.data.nombre);
    //setApellidos(response.data.apellidos);
  }
  catch(error){
    console.log(error)
  }
  finally{
    setLoading(false)
  }
};

const saveVendendor = async () => {
  if (!nombre.trim() || !correo.trim() || !comision.trim()) {
    alert("Nombre y usuario inválido");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.post(`http://172.16.63.73:3000/api/clientes`, {
      nombre,
      correo,
      comision
    });
    alert("Vendedor agregado correctamente ...")
    setNombre("")
    setCorreo("")
    setComision("")
    getClientes()
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

const {control,handleSubmit,formState: { errors }} = useForm(
  {
    defaultValues: {
      nombre: nombre,
      correo: correo,
      comision: comision
    }
  }
);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View>
        <Text style={{marginBottom:10,textAlign:"center",fontSize:20}}>Vendendores</Text>

        <TextInput
          style={[styles.input]}
          placeholder="Ingrese le id del vendedor"
          onChangeText={idsearch => setIdSearch(idsearch)}
          value={idsearch}/>

          <TextInput
          style={[styles.input]}
          value={nombre}
          placeholder="Nombre"
          onChangeText={nombre => setNombre(nombre)}/>

          <TextInput
          style={[styles.input]}
          value={correo}
          placeholder="Correo Electronico"
          onChangeText={correo => setCorreo(correo)}/>

          <TextInput
          style={[styles.input]}
          value={comision}
          placeholder="Comision"
          onChangeText={comision => setComision(comision)}/>

          <TouchableOpacity
          style={[styles.buttons,{backgroundColor:"#7EFF78",marginBottom:15}]}
          onPress={() => saveVendendor()}>
        <Text>Guardar Vendedor</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={[styles.buttons,{backgroundColor:"#5DCBFF",marginBottom:15}]}
      onPress={getVendedorById}>
        <Text>Buscar Vendedor</Text>
      </TouchableOpacity>
      </View>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.boxUsers}>
              <Text>Id Cliente: {item._id}</Text>
              <Text>Nombre: {item.nombre}</Text>
              <Text>Apellidos: {item.apellidos}</Text>
              <TouchableOpacity
                style={[styles.buttons,{backgroundColor:"#00000050"}]}
                onPress = {() => {
                  alert(item.nombre)
                }
              }>
                <Text>Ver información</Text>
              </TouchableOpacity>
            </View>
            
          )}
        />
      )} 
    </View>
  )}
  

function Venta({ route }) {
  return (
    <View>
      <Text>Inicioo</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Vendedor"
        component={Vendedor}
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={20} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Venta"
        component={Venta}
        options={{ title: "Venta",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={20} color={color} />
        ) }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ title: "Sistema de Ventas" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxUsers: {
    backgroundColor:"#00000020",borderRadius:15,marginBottom:15,padding:10
  },
  buttons:{
    borderRadius:15,paddingVertical:5,textAlign:"center"
  },
  input:{
    marginBottom:15,
    backgroundColor:"#00000030",
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:15,
    borderColor:"#00000040",
    borderWidth:1
  }
});
