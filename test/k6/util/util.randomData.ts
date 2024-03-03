const _DATA_USER = {
  names: [
    'Hugo',
    'Martín',
    'Lucas',
    'Mateo',
    'Leo',
    'Daniel',
    'Alejandro',
    'Pablo',
    'Manuel',
    'Álvaro',
    'Adrián',
    'David',
    'Mario',
    'Enzo',
    'Diego',
    'Marcos',
    'Izan',
    'Javier',
    'Marco',
    'Álex',
  ],
  lastname: [
    'González',
    'Muñoz',
    'Rojas',
    'Díaz',
    'Pérez',
    'Soto',
    'Contreras',
    'Silva',
    'Martínez',
    'Sepúlveda',
    'Morales',
    'Rodríguez',
    'López',
    'Fuentes',
    'Hernández',
    'Torres',
    'Araya',
    'Flores',
    'Espinoza',
    'Valenzuela',
  ],
  sexo: ['M', 'F'],
  booleano: [true, false],
  emailSuffix: ['@gmail.com', '@hotmail.com', '@outlock.com', '@terra.cl'],
  company: ['Firk Ltda', 'Jean CLose de pisahua S.A.', 'Juan Gomas ByB Ltda', 'Número One S.A.'],
};

export function makeCod(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function randomRut() {
  return Math.round(Math.random() * (25000000 - 5000000)) + 5000000;
}

export function getDigitoVerificador(rut) {
  let dvr = '0';
  let suma = 0;
  let mul = 2;
  for (let i = rut.length - 1; i >= 0; i--) {
    suma = suma + rut.charAt(i) * mul;
    if (mul == 7) {
      mul = 2;
    } else {
      mul++;
    }
  }
  let res = suma % 11;
  if (res == 1) {
    return 'K';
  } else if (res == 0) {
    return '0';
  } else {
    return (11 - res).toString();
  }
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function getRandomEmail() {
  const emailPart1A = _DATA_USER.names[Math.floor(Math.random() * _DATA_USER.names.length)];
  const emailPart1B = _DATA_USER.lastname[Math.floor(Math.random() * _DATA_USER.lastname.length)];
  const emailPart2 = _DATA_USER.emailSuffix[Math.floor(Math.random() * _DATA_USER.emailSuffix.length)];

  return emailPart1A.toLowerCase() + emailPart1B.substring(0, 1).toLowerCase() + emailPart2;
}

export function getRandomAddress() {
  return makeCod(5) + ' del ' + makeCod(4) + ', ' + getRandomIntInclusive(10, 10000);
}

export function randomData(tipo) {
  switch (tipo) {
    case 'names':
      return _DATA_USER.names[Math.floor(Math.random() * _DATA_USER.names.length)];
      break;
    case 'lastname':
      return _DATA_USER.lastname[Math.floor(Math.random() * _DATA_USER.lastname.length)];
      break;
    case 'gender':
      return _DATA_USER.sexo[Math.floor(Math.random() * _DATA_USER.sexo.length)];
      break;
    case 'boolean':
      return _DATA_USER.booleano[Math.floor(Math.random() * _DATA_USER.booleano.length)];
      break;
    case 'dateBirth':
      return getRandomDate(new Date(1960, 0, 1), new Date());
      break;
    case 'mobileNumber':
      return getRandomIntInclusive(96000000, 99999999);
      break;
    case 'email':
      return getRandomEmail();
      break;
    case 'communeCode':
      return getRandomIntInclusive(1101, 16305);
      break;
    case 'address':
      return getRandomAddress();
      break;
    case 'company':
      return _DATA_USER.company[Math.floor(Math.random() * _DATA_USER.company.length)];
      break;
  }
}
