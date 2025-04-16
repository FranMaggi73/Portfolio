export enum HttpStatus {
  OK = 200,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500
}
export interface CartItem extends Product {
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Mancuerna Ajustable 10kg',
    price: 30000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  },
  {
    id: 2,
    name: 'Mancuerna Ajustable 20kg',
    price: 45000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  },
  {
    id: 3,
    name: 'Mancuerna Ajustable 30kg',
    price: 55000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  },
  {
    id: 4,
    name: 'Mancuerna Ajustable 40kg',
    price: 65000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  },
  {
    id: 5,
    name: 'Mancuerna Ajustable 50kg',
    price: 75000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  },
  {
    id: 6,
    name: 'Mancuerna Ajustable 60kg',
    price: 85000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  },
  {
    id: 7,
    name: 'Mancuerna Ajustable 70kg',
    price: 95000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  },
  {
    id: 8,
    name: 'Mancuerna Ajustable 80kg',
    price: 105000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  },
  {
    id: 9,
    name: 'Mancuerna Ajustable 90kg',
    price: 115000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  },
  {
    id: 10,
    name: 'Mancuerna Ajustable 100kg',
    price: 125000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  },
  {
    id: 11,
    name: 'Mancuerna Ajustable 110kg',
    price: 135000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  },
  {
    id: 12,
    name: 'Mancuerna Ajustable 120kg',
    price: 145000,
    image: '../../product-img/mancuerna-20kg.jpg',
    description: 'Mancuerna ajustable, ideal para home gym.'
  }
];

export interface Country {
  name: string;
  abbreviation: string;
}

export const countries: Country[] = [
  { name: 'Afghanistan', abbreviation: 'AF' },
  { name: 'Albania', abbreviation: 'AL' },
  { name: 'Algeria', abbreviation: 'DZ' },
  { name: 'Andorra', abbreviation: 'AD' },
  { name: 'Angola', abbreviation: 'AO' },
  { name: 'Antigua and Barbuda', abbreviation: 'AG' },
  { name: 'Argentina', abbreviation: 'AR' },
  { name: 'Armenia', abbreviation: 'AM' },
  { name: 'Australia', abbreviation: 'AU' },
  { name: 'Austria', abbreviation: 'AT' },
  { name: 'Azerbaijan', abbreviation: 'AZ' },
  { name: 'Bahamas', abbreviation: 'BS' },
  { name: 'Bahrain', abbreviation: 'BH' },
  { name: 'Bangladesh', abbreviation: 'BD' },
  { name: 'Barbados', abbreviation: 'BB' },
  { name: 'Belarus', abbreviation: 'BY' },
  { name: 'Belgium', abbreviation: 'BE' },
  { name: 'Belize', abbreviation: 'BZ' },
  { name: 'Benin', abbreviation: 'BJ' },
  { name: 'Bhutan', abbreviation: 'BT' },
  { name: 'Bolivia', abbreviation: 'BO' },
  { name: 'Bosnia and Herzegovina', abbreviation: 'BA' },
  { name: 'Botswana', abbreviation: 'BW' },
  { name: 'Brazil', abbreviation: 'BR' },
  { name: 'Brunei', abbreviation: 'BN' },
  { name: 'Bulgaria', abbreviation: 'BG' },
  { name: 'Burkina Faso', abbreviation: 'BF' },
  { name: 'Burundi', abbreviation: 'BI' },
  { name: 'Cabo Verde', abbreviation: 'CV' },
  { name: 'Cambodia', abbreviation: 'KH' },
  { name: 'Cameroon', abbreviation: 'CM' },
  { name: 'Canada', abbreviation: 'CA' },
  { name: 'Central African Republic', abbreviation: 'CF' },
  { name: 'Chad', abbreviation: 'TD' },
  { name: 'Chile', abbreviation: 'CL' },
  { name: 'China', abbreviation: 'CN' },
  { name: 'Colombia', abbreviation: 'CO' },
  { name: 'Comoros', abbreviation: 'KM' },
  { name: 'Congo, Democratic Republic of the', abbreviation: 'CD' },
  { name: 'Congo, Republic of the', abbreviation: 'CG' },
  { name: 'Costa Rica', abbreviation: 'CR' },
  { name: 'Croatia', abbreviation: 'HR' },
  { name: 'Cuba', abbreviation: 'CU' },
  { name: 'Cyprus', abbreviation: 'CY' },
  { name: 'Czech Republic', abbreviation: 'CZ' },
  { name: 'Denmark', abbreviation: 'DK' },
  { name: 'Djibouti', abbreviation: 'DJ' },
  { name: 'Dominica', abbreviation: 'DM' },
  { name: 'Dominican Republic', abbreviation: 'DO' },
  { name: 'Ecuador', abbreviation: 'EC' },
  { name: 'Egypt', abbreviation: 'EG' },
  { name: 'El Salvador', abbreviation: 'SV' },
  { name: 'Equatorial Guinea', abbreviation: 'GQ' },
  { name: 'Eritrea', abbreviation: 'ER' },
  { name: 'Estonia', abbreviation: 'EE' },
  { name: 'Eswatini', abbreviation: 'SZ' },
  { name: 'Ethiopia', abbreviation: 'ET' },
  { name: 'Fiji', abbreviation: 'FJ' },
  { name: 'Finland', abbreviation: 'FI' },
  { name: 'France', abbreviation: 'FR' },
  { name: 'Gabon', abbreviation: 'GA' },
  { name: 'Gambia', abbreviation: 'GM' },
  { name: 'Georgia', abbreviation: 'GE' },
  { name: 'Germany', abbreviation: 'DE' },
  { name: 'Ghana', abbreviation: 'GH' },
  { name: 'Greece', abbreviation: 'GR' },
  { name: 'Grenada', abbreviation: 'GD' },
  { name: 'Guatemala', abbreviation: 'GT' },
  { name: 'Guinea', abbreviation: 'GN' },
  { name: 'Guinea-Bissau', abbreviation: 'GW' },
  { name: 'Guyana', abbreviation: 'GY' },
  { name: 'Haiti', abbreviation: 'HT' },
  { name: 'Honduras', abbreviation: 'HN' },
  { name: 'Hungary', abbreviation: 'HU' },
  { name: 'Iceland', abbreviation: 'IS' },
  { name: 'India', abbreviation: 'IN' },
  { name: 'Indonesia', abbreviation: 'ID' },
  { name: 'Iran', abbreviation: 'IR' },
  { name: 'Iraq', abbreviation: 'IQ' },
  { name: 'Ireland', abbreviation: 'IE' },
  { name: 'Israel', abbreviation: 'IL' },
  { name: 'Italy', abbreviation: 'IT' },
  { name: 'Jamaica', abbreviation: 'JM' },
  { name: 'Japan', abbreviation: 'JP' },
  { name: 'Jordan', abbreviation: 'JO' },
  { name: 'Kazakhstan', abbreviation: 'KZ' },
  { name: 'Kenya', abbreviation: 'KE' },
  { name: 'Kiribati', abbreviation: 'KI' },
  { name: 'Korea, North', abbreviation: 'KP' },
  { name: 'Korea, South', abbreviation: 'KR' },
  { name: 'Kuwait', abbreviation: 'KW' },
  { name: 'Kyrgyzstan', abbreviation: 'KG' },
  { name: 'Laos', abbreviation: 'LA' },
  { name: 'Latvia', abbreviation: 'LV' },
  { name: 'Lebanon', abbreviation: 'LB' },
  { name: 'Lesotho', abbreviation: 'LS' },
  { name: 'Liberia', abbreviation: 'LR' },
  { name: 'Libya', abbreviation: 'LY' },
  { name: 'Liechtenstein', abbreviation: 'LI' },
  { name: 'Lithuania', abbreviation: 'LT' },
  { name: 'Luxembourg', abbreviation: 'LU' },
  { name: 'Madagascar', abbreviation: 'MG' },
  { name: 'Malawi', abbreviation: 'MW' },
  { name: 'Malaysia', abbreviation: 'MY' },
  { name: 'Maldives', abbreviation: 'MV' },
  { name: 'Mali', abbreviation: 'ML' },
  { name: 'Malta', abbreviation: 'MT' },
  { name: 'Marshall Islands', abbreviation: 'MH' },
  { name: 'Mauritania', abbreviation: 'MR' },
  { name: 'Mauritius', abbreviation: 'MU' },
  { name: 'Mexico', abbreviation: 'MX' },
  { name: 'Micronesia', abbreviation: 'FM' },
  { name: 'Moldova', abbreviation: 'MD' },
  { name: 'Monaco', abbreviation: 'MC' },
  { name: 'Mongolia', abbreviation: 'MN' },
  { name: 'Montenegro', abbreviation: 'ME' },
  { name: 'Morocco', abbreviation: 'MA' },
  { name: 'Mozambique', abbreviation: 'MZ' },
  { name: 'Myanmar', abbreviation: 'MM' },
  { name: 'Namibia', abbreviation: 'NA' },
  { name: 'Nauru', abbreviation: 'NR' },
  { name: 'Nepal', abbreviation: 'NP' },
  { name: 'Netherlands', abbreviation: 'NL' },
  { name: 'New Zealand', abbreviation: 'NZ' },
  { name: 'Nicaragua', abbreviation: 'NI' },
  { name: 'Niger', abbreviation: 'NE' },
  { name: 'Nigeria', abbreviation: 'NG' },
  { name: 'North Macedonia', abbreviation: 'MK' },
  { name: 'Norway', abbreviation: 'NO' },
  { name: 'Oman', abbreviation: 'OM' },
  { name: 'Pakistan', abbreviation: 'PK' },
  { name: 'Palau', abbreviation: 'PW' },
  { name: 'Panama', abbreviation: 'PA' },
  { name: 'Papua New Guinea', abbreviation: 'PG' },
  { name: 'Paraguay', abbreviation: 'PY' },
  { name: 'Peru', abbreviation: 'PE' },
  { name: 'Philippines', abbreviation: 'PH' },
  { name: 'Poland', abbreviation: 'PL' },
  { name: 'Portugal', abbreviation: 'PT' },
  { name: 'Qatar', abbreviation: 'QA' },
  { name: 'Romania', abbreviation: 'RO' },
  { name: 'Russia', abbreviation: 'RU' },
  { name: 'Rwanda', abbreviation: 'RW' },
  { name: 'Saint Kitts and Nevis', abbreviation: 'KN' },
  { name: 'Saint Lucia', abbreviation: 'LC' },
  { name: 'Saint Vincent and the Grenadines', abbreviation: 'VC' },
  { name: 'Samoa', abbreviation: 'WS' },
  { name: 'San Marino', abbreviation: 'SM' },
  { name: 'Sao Tome and Principe', abbreviation: 'ST' },
  { name: 'Saudi Arabia', abbreviation: 'SA' },
  { name: 'Senegal', abbreviation: 'SN' },
  { name: 'Serbia', abbreviation: 'RS' },
  { name: 'Seychelles', abbreviation: 'SC' },
  { name: 'Sierra Leone', abbreviation: 'SL' },
  { name: 'Singapore', abbreviation: 'SG' },
  { name: 'Slovakia', abbreviation: 'SK' },
  { name: 'Slovenia', abbreviation: 'SI' },
  { name: 'Solomon Islands', abbreviation: 'SB' },
  { name: 'Somalia', abbreviation: 'SO' },
  { name: 'South Africa', abbreviation: 'ZA' },
  { name: 'South Sudan', abbreviation: 'SS' },
  { name: 'Spain', abbreviation: 'ES' },
  { name: 'Sri Lanka', abbreviation: 'LK' },
  { name: 'Sudan', abbreviation: 'SD' },
  { name: 'Suriname', abbreviation: 'SR' },
  { name: 'Sweden', abbreviation: 'SE' },
  { name: 'Switzerland', abbreviation: 'CH' },
  { name: 'Syria', abbreviation: 'SY' },
  { name: 'Taiwan', abbreviation: 'TW' },
  { name: 'Tajikistan', abbreviation: 'TJ' },
  { name: 'Tanzania', abbreviation: 'TZ' },
  { name: 'Thailand', abbreviation: 'TH' },
  { name: 'Timor-Leste', abbreviation: 'TL' },
  { name: 'Togo', abbreviation: 'TG' },
  { name: 'Tonga', abbreviation: 'TO' },
  { name: 'Trinidad and Tobago', abbreviation: 'TT' },
  { name: 'Tunisia', abbreviation: 'TN' },
  { name: 'Turkey', abbreviation: 'TR' },
  { name: 'Turkmenistan', abbreviation: 'TM' },
  { name: 'Tuvalu', abbreviation: 'TV' },
  { name: 'Uganda', abbreviation: 'UG' },
  { name: 'Ukraine', abbreviation: 'UA' },
  { name: 'United Arab Emirates', abbreviation: 'AE' },
  { name: 'United Kingdom', abbreviation: 'GB' },
  { name: 'United States', abbreviation: 'US' },
  { name: 'Uruguay', abbreviation: 'UY' },
  { name: 'Uzbekistan', abbreviation: 'UZ' },
  { name: 'Vanuatu', abbreviation: 'VU' },
  { name: 'Vatican City', abbreviation: 'VA' },
  { name: 'Venezuela', abbreviation: 'VE' },
  { name: 'Vietnam', abbreviation: 'VN' },
  { name: 'Yemen', abbreviation: 'YE' },
  { name: 'Zambia', abbreviation: 'ZM' },
  { name: 'Zimbabwe', abbreviation: 'ZW' }
];
