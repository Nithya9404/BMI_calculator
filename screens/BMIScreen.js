import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput,Button} from 'react-native' 
import Ajv from 'ajv';
import lexicon from '../lexicons/bmicalculation.json'
 
export default function BMI(){
    const [weight,setweight] = useState('');
    const [height, setheight] = useState('');
    const [result, setresult] = useState('')

    const handleCalculation = () => {
      const ajv = new Ajv();
      const validate = ajv.compile(lexicon.defs.main.input.schema);

      const formData = {
        weight: parseFloat(weight),
        height: parseFloat(height)
      };

      const isValid = validate(formData);
      
      if (isValid){
        const bmi = formData.weight/(formData.height * formData.height);
        const bmiCategory = getBMICategory(bmi);
        setresult(`BMI: ${bmi.toFixed(2)},Category: ${bmiCategory}`);
    }
    else{
        setresult('Invalid height or weight');
    }
    };

  const getBMICategory = (bmi) => {
    if(bmi < 18.5) return 'Under weight';
    if(bmi < 24.9) return 'Normal weight';
    if(bmi < 29.9) return 'Over weight';
    return 'Obese';
  };
  return(
<View style={styles.container}>
    <Text style={styles.textinput}>BMI Calculator</Text>
    <View>
    <TextInput
    placeholder="Weight(kg)"
    value={weight}
    onChangeText={setweight}
    keyboardType="numeric"
    style={styles.input}
    ></TextInput>
    <TextInput
    placeholder="Height (m)"
    value={height}
    onChangeText={setheight}
    style={styles.input}
    />
  </View>
  <View style={styles.buttoncontainer}>
    <Button style={styles.button} title="Calculate" onPress={handleCalculation}/>
  </View>
  <Text>The calculated BMI is {result}</Text>
</View>
  );
};

const styles = StyleSheet.create({
   container:{
    flex: 1,
    padding: 16,
    justifyContent: 'center',
   },
   textinput:{
    fontSize:30,
    fontWeight:'bold'
   },
   input: {
    width: 200,
    height: 40,
    borderRadius: 8, 
    borderWidth: 1, 
    padding: 10,
   },
   buttoncontainer:{
    width: 320,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 5,
    marginBottom:30
   },
   button:{
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#0000FF',
  },
});
