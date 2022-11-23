import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  Picker,
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
import axios from 'axios'


function Vendedor({ route }) {

  const [idsearch, setIdSearch] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("")
  const [comision, setComision] = useState("")

const getVendedorById = async (id) => {
  try{
    const url = `http://172.16.63.73:3000/api/clientes/${id}`;
    const response = await axios.get(url);

    setNombre(response.data.nombre);
    setCorreo(response.data.correo);
    setComision(response.data.comision);
    setComision(response.data.totalcomision);
  }
  catch(error){
    console.log(error)
  }
};

const saveVendendor = async () => {
  if (!nombre.trim() || !correo.trim() || !idsearch.trim()) {
    alert("Información inválido");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.post(`http://172.16.63.73:3000/api/clientes`, {
      idsearch,
      nombre,
      correo,
      comision,
    });
    alert("Vendedor agregado correctamente ...")
    setNombre("")
    setCorreo("")
    setComision("")
    setIdSearch("")
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
      id:idsearch,
      nombre: nombre,
      correo: correo,
      comision: comision
    }
  }
);

const onSubmit = data => getVendedorById(data.id)
const saveVend = data => saveVendendor()

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View>
        <Text style={{marginBottom:25,textAlign:"center",fontSize:25}}>Vendendores</Text>

      <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^[0-9]+$/i, // validar que solo sean letras y espacios
          maxLength:11,
          minLength:1
        }}
        render={({field: {onChange, onBlur, value}})=>(
          <TextInput
          style={[styles.input]}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Ingrese le id del vendedor"
          onChangeText={value => setIdSearch(value)}
          value={idsearch}/>
        )}
        name='id'  // Valor a validar
      />
      {errors.id?.type == "required" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>La identificación es obligatoria</Text>}
      {errors.id?.type == "pattern" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>La identificación solo debe tener numeros</Text>}
      {errors.id?.type == "maxLength" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>La identificacion debe de tener menos de 11 digitos</Text>}
      {errors.id?.type == "minLength" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>La identificacion debe de tener mas de 1 digito</Text>}


      <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^[A-Za-zÑñáéóúí ]+$/i, // validar que solo sean letras y espacios
          maxLength:30,
          minLength:3
        }}
        render={({field: {onChange, onBlur, value}})=>(
          <TextInput
          style={[styles.input]}
          value={nombre}
          placeholder="Nombre"
          onChange={onChange}
          onBlur={onBlur}
          onChangeText={value => setNombre(value)}
          />
        )}
        name='nombre'  // Valor a validar
      />
      {errors.nombre?.type == "required" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>El nombre es obligatorio</Text>}
      {errors.nombre?.type == "pattern" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>El nombre solo debe de tener letras y espacios</Text>}
      {errors.nombre?.type == "maxLength" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>El nombre no puede ser mayor a 30 caracteres</Text>}
      {errors.nombre?.type == "minLength" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>El nombre no puede ser menor a 3 caracteres</Text>}

      <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, // validar que solo sean letras y espacios
        }}
        render={({field: {onChange, onBlur, value}})=>(
          <TextInput
          style={[styles.input]}
          value={correo}  
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Correo Electronico"
          onChangeText={value => setCorreo(value)}/>
        )}
        name='correo'  // Valor a validar
      />
      {errors.correo?.type == "required" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>El email es obligatorio</Text>}
      {errors.correo?.type == "pattern" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>Ingrese un correo valido</Text>}

          <TextInput
          style={[styles.input]}
          editable={false}
          value={comision}
          placeholder="Comision"
          onChangeText={comision => setComision(comision)}/>

      <TouchableOpacity
          style={[styles.buttons,{backgroundColor:"#7EFF78",marginBottom:15}]}
          onPress={handleSubmit(saveVend)}>
        <Text>Guardar Vendedor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:"#5DCBFF",marginBottom:15}]}
        onPress={() => getVendedorById(idsearch)}>
        <Text>Buscar Vendedor</Text>
      </TouchableOpacity>
      </View>
    </View>
  )}
  

function Venta({ route }) {

  const [idsearch, setIdSearch] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("")
  const [comision, setComision] = useState("")
  const [zona, setZona] = useState("")
  const [fecha, setFecha] = useState("")
  const [valorVenta, setValorVenta] = useState("")

const saveVenta = async () => {
  if (!fecha.trim() || !valorVenta.trim() || !idsearch.trim()) {
    alert("Información inválida");
    return;
  }
  try {
    const response = await axios.post(`http://172.16.63.73:3000/api/articulos`, {
      idsearch,
      zona,
      fecha,
      valorVenta,
    });
    alert("Venta agregada correctamente ...")
    setFecha("")
    setZona("")
    setValorVenta("")
    setIdSearch("")
    getClientes()
  } catch (error) {
    console.log(error)
  }
};

  const {control,handleSubmit,formState: { errors }} = useForm(
    {
      defaultValues: {
        id:idsearch,
        zona: zona,
        fecha: fecha,
        valorVenta: valorVenta
      }
    }
  );
  
  const saveVent = data => saveVenta()

  return (

    <View style={{ flex: 1, padding: 20 }}>
    <View>
      <Text style={{marginBottom:20,textAlign:"center",fontSize:25}}>Ventas</Text>

      
      <Text style={{ marginBottom: 5 }}>Ingrese el id del vendedor</Text>
    <Controller
      control={control}
      rules={{
        required:true,
        pattern:/^[0-9]+$/i, // validar que solo sean letras y espacios
        maxLength:11,
        minLength:1
      }}
      render={({field: {onChange, onBlur, value}})=>(
        <TextInput
        style={[styles.input]}
        onChange={onChange}
        onBlur={onBlur}
        onChangeText={value => setIdSearch(value)}
        value={idsearch}/>
      )}
      name='id'  // Valor a validar
    />
    {errors.id?.type == "required" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>La identificación es obligatoria</Text>}
    {errors.id?.type == "pattern" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>La identificación solo debe tener numeros</Text>}
    {errors.id?.type == "maxLength" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>La identificacion debe de tener menos de 11 digitos</Text>}
    {errors.id?.type == "minLength" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>La identificacion debe de tener mas de 1 digito</Text>}
    
          <Text style={{ marginBottom: 5 }}>Ingrese la zona</Text>
          <Controller
            control={control}
            render={({field:{onChange, onBlur, value}}) => (
              <Picker
                selectedValue={zona}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) =>
                  setZona(itemValue)}>
                <Picker.Item label="Norte" value="a" />
                <Picker.Item label="Sur" value="b" />
              </Picker>
            )}
            name = "zona"
          />
          {errors.zona?.type == "value" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>La zona es obligatoria</Text>}
        
        <Text style={{ marginBottom: 5 }}>Fecha</Text>

        <Controller
          control={control}
          rules={{ 
            pattern:/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/,
            required:true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onChange={onChange}
              onBlur={onBlur}
              onChangeText={value=>setFecha(value)}
              value={fecha}
            />
          )}
          name="fecha" // Valor a validar
        />
        {errors.fecha?.type == "pattern" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>Ingrese una fecha dd/mm/aaaa</Text>}
        {errors.fecha?.type == "required" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>Ingrese una fecha</Text>}
      
        <Text style={{ marginBottom: 5 }}>Valor de la venta</Text>

        <Controller
          control={control}
          rules={{ // validar que solo sean letras
            pattern:/^[0-9]+$/i,
            min:2000000,
            max:100000000000,
            required:true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onChange={onChange}
              onBlur={onBlur}
              onChangeText={value=>setValorVenta(value)}
              value={valorVenta}
            />
          )}
          name="valorVenta" // Valor a validar
        />
        {errors.valorVenta?.type == "min" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>El valor de la venta debe ser mayor a 2 millon</Text>}
        {errors.valorVenta?.type == "max" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>El valor de la venta debe ser menor a 10.000 millon</Text>}
        {errors.valorVenta?.type == "required" && <Text style={{color:'red',marginBottom:5,marginTop:-13}}>El valor de la venta es obligatorio</Text>}
      


    <TouchableOpacity
        style={[styles.buttons,{backgroundColor:"#7EFF78",marginBottom:15}]}
        onPress={handleSubmit(saveVent)}>
      <Text>Guardar Venta</Text>
    </TouchableOpacity>
    </View>
  </View>
  )
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
