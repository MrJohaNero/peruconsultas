# peruconsultas
API Rest que permite realizar diversas consultas a entidades de Perú.

Luego de descargar el proyecto debe instalar las dependencias.
```javascript
npm install
```

Por ahora se pueden realizar las siguientes consultas:
* Consulta de Ruc en Sunat: 
  * URL: http://localhost:8081/ruc/consulta/10706013437111
  * Response:
  ```json
  [
    {
      "ruc": "20100070970",
      "razon_social": "SUPERMERCADOS PERUANOS SOCIEDAD ANONIMA 'O ' S.P.S.A.",
      "tipo_contribuyente": "SOCIEDAD ANONIMA",
      "profesion": "-",
      "nombre_comercial": "-",
      "condicion": "HABIDO",
      "estado": "ACTIVO",
      "fecha_inscripcion": "09/10/1992",
      "inicio_actividades": "01/06/1979",
      "departamento": "LIMA",
      "provincia": "LIMA",
      "distrito": "SAN BORJA",
      "direccion_referencia": "CAL. MORELLI NRO. 181 INT. P-2",
      "telefono": "-",
      "fax": "-",
      "comercio_exterior": "SIN ACTIVIDAD",
      "principal_CIIU": "VTA. MIN. EN ALMACENES NO ESPECIALIZ.",
      "secundario1_CIIU": "VENTA PARTES, PIEZAS, ACCESORIOS.",
      "secundario2_CIIU": "VENTA, MANTEN. Y REPARAC. MOTOCICLETAS.",
      "nuevo_rus": "NO",
      "buen_contribuyente": "-",
      "agente_retencion": "SI, incorporado al Régimen de Agentes de Retención de IGV (R.S.037-2002) a partir del 01/06/2002",
      "agente_percepcion_vtaint": "-",
      "agente_percepcion_comliq": "-"
    }
  ]
  ```
* Consulta de Tipo de Cambio de la Sunat [Actual]: 
  * URL: http://localhost:8081/tipocambio/actual
  * Response:
  ```json
  {
    "dias": "5",
    "compra": "3.332",
    "venta": "3.335"
  }
  ```
* Consulta de Tipo de Cambio de la Sunat [Mes]: 
  * URL: http://localhost:8081/tipocambio/mes/2018/10
  * Response:
  ```json
  [
    {
      "dia": 2,
      "compra": "3.306",
      "venta": "3.309"
    },
    {
      "dia": 3,
      "compra": "3.312",
      "venta": "3.314"
    },
    {
      "dia": 4,
      "compra": "3.311",
      "venta": "3.314"
    },
    {
      "dia": 5,
      "compra": "3.332",
      "venta": "3.335"
    }
  ]
  ```
 * Consulta de Tipo de Cambio de la Sunat [Dia]: 
  * URL: http://localhost:8081/tipocambio/dia/2018-09-06
  * Response:
  ```json
  [
    {
      "dias": "6",
      "compra": "3.316",
      "venta": "3.317"
    }
  ]
  ```
