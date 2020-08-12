import parser from 'fast-xml-parser';
import fs from 'fs';

const fxpOptions = {
  attributeNamePrefix: '', // Don't prefix attributes
  ignoreAttributes: false, // Collect them
  ignoreNamespace: true, // Flatten namespaces
  allowBooleanAttributes: true, // I'm not sure there are any
  parseAttributeValue: true, // Parse out attribute values to Number etc
};

const xmlData = fs.readFileSync('funwithforms.xml', 'utf-8');

try {
  const jsonData = parser.parse(xmlData, fxpOptions, true);

  console.log(JSON.stringify(jsonData, null, 2));
} catch (error) {
  console.error(error.message);
}
