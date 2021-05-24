import React, { useEffect, useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Button from '../../components/Button';


import { AlignButton, AlignQuestions, Container, Content, Question, SelectButton, TextAnswers } from './styles';


const TriageClient: React.FC = () => {

  const { user } = useAuth();

  const [question1, setQuestion1] = useState(2);
  const [question2, setQuestion2] = useState(3);
  const [question3, setQuestion3] = useState(3);
  const [question4, setQuestion4] = useState(4);
  const [question5, setQuestion5] = useState(5);
  const [question6, setQuestion6] = useState(6);
  const [question7, setQuestion7] = useState(7);
  const [question8, setQuestion8] = useState(8);
  const [question9, setQuestion9] = useState(9);
  const [question10, setQuestion10] = useState(10);


  return (

    <Content>
      <Container>
        <Question>Você tem se sentido desanimado, deprimido, ou desesperançado desde o mês passado?</Question>
        <SelectButton>
          <RadioButton
            value= '1'
            color='pink'
            status={ question1 === 1 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion1(1)}
          />
          <TextAnswers>Sim</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '2'
            color='pink'
            status={ question1 === 2 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion1(2)}
          />
          <TextAnswers>Não</TextAnswers>
        </SelectButton>

        <Question>Você está preocupado pela falta de interesse ou prazer em fazer as coisas?</Question>
        <SelectButton>
          <RadioButton
            value= '3'
            color='pink'
            status={ question2 === 3 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion2(3)}
          />
          <TextAnswers>Nunca</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '4'
            color='pink'
            status={ question2 === 4 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion2(4)}
          />
          <TextAnswers>Raramente</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '5'
            color='pink'
            status={ question2 === 5 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion2(5)}
          />
          <TextAnswers>Às vezes</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '6'
            color='pink'
            status={ question2 === 6 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion2(6)}
          />
          <TextAnswers>Muitas vezes</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '7'
            color='pink'
            status={ question2 === 7 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion2(7)}
          />
          <TextAnswers>Sempre</TextAnswers>
        </SelectButton>

        <Question>Você tem ataques súbitos ou inesperados de ansiedade ou nervosismo?</Question>
        <SelectButton>
          <RadioButton
            value= '8'
            color='pink'
            status={ question3 === 8 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion3(8)}
          />
          <TextAnswers>Nunca</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '9'
            color='pink'
            status={ question3 === 9 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion3(9)}
          />
          <TextAnswers>Raramente</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '10'
            color='pink'
            status={ question3 === 10 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion3(10)}
          />
          <TextAnswers>Às vezes</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '11'
            color='pink'
            status={ question3 === 11 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion3(11)}
          />
          <TextAnswers>Muitas vezes</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '12'
            color='pink'
            status={ question3 === 12 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion3(12)}
          />
          <TextAnswers>Sempre</TextAnswers>
        </SelectButton>

        <Question>Você se sente tenso, preocupado ou estressado com frequência?</Question>
        <SelectButton>
          <RadioButton
            value= '13'
            color='pink'
            status={ question4 === 8 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion4(8)}
          />
          <TextAnswers>Nunca</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '14'
            color='pink'
            status={ question4 === 9 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion4(9)}
          />
          <TextAnswers>Raramente</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '15'
            color='pink'
            status={ question4 === 10 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion4(10)}
          />
          <TextAnswers>Às vezes</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '16'
            color='pink'
            status={ question4 === 11 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion4(11)}
          />
          <TextAnswers>Muitas vezes</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '17'
            color='pink'
            status={ question4 === 12 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion4(12)}
          />
          <TextAnswers>Sempre</TextAnswers>
        </SelectButton>
        
        <Question>Você tem atravessado algum período significativamente estressante nos últimos 6 meses?</Question>
        <SelectButton>
          <RadioButton
            value= '18'
            color='pink'
            status={ question5 === 18 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion5(18)}
          />
          <TextAnswers>Sim</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '19'
            color='pink'
            status={ question5 === 19 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion5(19)}
          />
          <TextAnswers>Não</TextAnswers>
        </SelectButton>

        <Question>Você enfrentou em sua história algum evento potencialmente ameaçador à sua vida tais como:</Question>
        <SelectButton>
          <Checkbox
            value= '20'
            color='pink'
            status={ question6 === 20 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion6(20)}
          />
          <TextAnswers>Catástrofes naturais</TextAnswers>
        </SelectButton>
        <SelectButton>
          <Checkbox
            value= '21'
            color='pink'
            status={ question6 === 21 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion6(21)}
          />
          <TextAnswers>Acidente grave</TextAnswers>
        </SelectButton>
        <SelectButton>
          <Checkbox
            value= '22'
            color='pink'
            status={ question6 === 22 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion6(22)}
          />
          <TextAnswers>Violência física</TextAnswers>
        </SelectButton>
        <SelectButton>
          <Checkbox
            value= '23'
            color='pink'
            status={ question6 === 23 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion6(23)}
          />
          <TextAnswers>Violência sexual</TextAnswers>
        </SelectButton>
        <SelectButton>
          <Checkbox
            value= '24'
            color='pink'
            status={ question6 === 24 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion6(24)}
          />
          <TextAnswers>Combate militar</TextAnswers>        
        </SelectButton>
        <SelectButton>
          <Checkbox
            value= '25'
            color='pink'
            status={ question6 === 25 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion6(25)}
          />
          <TextAnswers>Abuso infantil</TextAnswers>      
        </SelectButton>
        <SelectButton>
          <Checkbox
            value= '26'
            color='pink'
            status={ question6 === 26 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion6(26)}
          />
          <TextAnswers>Nenhum</TextAnswers>
        </SelectButton>

        <Question>Com que frequência você usa bebidas alcoólicas?</Question>
        <SelectButton>
          <RadioButton
            value= '27'
            color='pink'
            status={ question7 === 27 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion7(27)}
          />
          <TextAnswers>Diariamente</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '28'
            color='pink'
            status={ question7 === 28 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion7(28)}
          />
          <TextAnswers>Somente nos finais de semana</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '29'
            color='pink'
            status={ question7 === 29 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion7(29)}
          />
          <TextAnswers>Só em ocasiões especiais</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '30'
            color='pink'
            status={ question7 === 30 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion7(30)}
          />
          <TextAnswers>Nunca</TextAnswers>
        </SelectButton>
      
      {question7 !== 30 ?
        <>
          <Question>Nos dias em que você bebe, quantos drinks você toma em média?</Question>
          <SelectButton>
            <RadioButton
              value= '31'
              color='pink'
              status={ question8 === 31 ? 'checked' : 'unchecked' }
              onPress={() => setQuestion8(31)}
            />
            <TextAnswers>1</TextAnswers>
          </SelectButton>
          <SelectButton>
            <RadioButton
              value= '32'
              color='pink'
              status={ question8 === 32 ? 'checked' : 'unchecked' }
              onPress={() => setQuestion8(32)}
            />
            <TextAnswers>2</TextAnswers>
          </SelectButton>
          <SelectButton>
            <RadioButton
              value= '33'
              color='pink'
              status={ question8 === 33 ? 'checked' : 'unchecked' }
              onPress={() => setQuestion8(33)}
            />
            <TextAnswers>3</TextAnswers>
          </SelectButton>
          <SelectButton>
            <RadioButton
              value= '34'
              color='pink'
              status={ question8 === 30 ? 'checked' : 'unchecked' }
              onPress={() => setQuestion8(30)}
            />
            <TextAnswers>4</TextAnswers>
          </SelectButton>
          <SelectButton>
            <RadioButton
              value= '35'
              color='pink'
              status={ question8 === 35 ? 'checked' : 'unchecked' }
              onPress={() => setQuestion8(35)}
            />
            <TextAnswers>5 ou mais</TextAnswers>
          </SelectButton>
        </>
    : null}
 
        <Question>Você usa medicamentos/drogas em excesso para:</Question>
        <AlignQuestions>
          <SelectButton>
            <Checkbox
              value= '36'
              color='pink'
              status={ question9 === 36 ? 'checked' : 'unchecked' }
              onPress={() => setQuestion9(36)}
            />
            <TextAnswers>Relaxar</TextAnswers>
          </SelectButton>
          <SelectButton>
            <Checkbox
              value= '37'
              color='pink'
              status={ question9 === 37 ? 'checked' : 'unchecked' }
              onPress={() => setQuestion9(37)}
            />
            <TextAnswers>Aliviar o estresse</TextAnswers>
          </SelectButton>
          <SelectButton>
            <Checkbox
              value= '38'
              color='pink'
              status={ question9 === 38 ? 'checked' : 'unchecked' }
              onPress={() => setQuestion9(38)}
            />
            <TextAnswers>Acalmar meus nervos</TextAnswers>
          </SelectButton>
          <SelectButton>
            <Checkbox
              value= '39'
              color='pink'
              status={ question9 === 39 ? 'checked' : 'unchecked' }
              onPress={() => setQuestion9(39)}
            />
            <TextAnswers>Controlar uma dor</TextAnswers>
          </SelectButton>
          <SelectButton>
            <Checkbox
              value= '40'
              color='pink'
              status={ question9 === 40 ? 'checked' : 'unchecked' }
              onPress={() => setQuestion9(40)}
            />
            <TextAnswers>Não utilizo</TextAnswers>
          </SelectButton>
        </AlignQuestions>

    {question9 !== 40 ?
      <>    
        <Question>Nos dias em que você usa medicamentos ou drogas pelas razões anteriores, que quantidades você costuma usar?</Question>
        <SelectButton>
          <RadioButton
            value= '41'
            color='pink'
            status={ question10 === 41 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion10(41)}
          />
          <TextAnswers>1-2</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '42'
            color='pink'
            status={ question10 === 42 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion10(42)}
          />
          <TextAnswers>3-4</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '43'
            color='pink'
            status={ question10 === 43 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion10(43)}
          />
          <TextAnswers>5-6</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '44'
            color='pink'
            status={ question10 === 44 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion10(44)}
          />
          <TextAnswers>7-8</TextAnswers>
        </SelectButton>
        <SelectButton>
          <RadioButton
            value= '45'
            color='pink'
            status={ question10 === 45 ? 'checked' : 'unchecked' }
            onPress={() => setQuestion10(45)}
          />
          <TextAnswers>9 ou mais</TextAnswers>
        </SelectButton>
      </>
    : null}

    <AlignButton>
      <Button>Próximo</Button>
    </AlignButton>
      </Container>
    </Content>
  )
}

export default TriageClient;




