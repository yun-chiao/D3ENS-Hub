import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { addEnsContracts } from '@ensdomains/ensjs'
import { getPrice } from '@ensdomains/ensjs/public'
import React, { useState } from 'react';
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PriceCard from './PriceCard';

function Page() {
    const [address, setAddress] = useState('');
    const [ensNames, setEnsNames] = useState([]);
    const [shibNames, setShibNames] = useState([]);
    const [coreNames, setCoreNames] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(0);

    const countPrice = (num) => {
      setPrice(price+parseFloat(num));
    };

    const fetchEnsNames = async () => {
      setPrice(0)
      setLoading(true);
      setError(null);
      setEnsNames([]);
  
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await axios.get(`https://api.opensea.io/api/v2/chain/ethereum/account/${address}/nfts`, {
          headers: {
            'Accept': 'application/json',
            'X-API-KEY': apiKey,
          },
        });
        console.log("response", response)
        const assets = response.data.nfts;
        const ensDomains = assets
          .filter(asset => asset.name && asset.name.endsWith('.eth'))
          .map(asset => asset.name);
        console.log("ensDomains", ensDomains)
        await fetchD3TokenDetail(ensDomains)
        setEnsNames(ensDomains);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch ENS names. Please check the address and try again.');
      } finally {
        setLoading(false);
      }
    };
  
    const fetchD3TokenDetail = async(ensDomains) => {
      setShibNames([]);
      setCoreNames([]);
        const muti_name = ensDomains
          .map(name => name.replace('.eth', ''))
          .join(',');
        try {
            const apiKey = process.env.REACT_APP_D3_API_KEY;
            const response = await axios.get(`https://api-public.d3.app/v1/partner/search?limit=25&skip=0&tld=shib&sld=${muti_name}`, {
              headers: {
                'Accept': 'application/json',
                'Api-Key': apiKey,
              },
            });
            setShibNames(response.data.pageItems)
            const response2 = await axios.get(`https://api-public.d3.app/v1/partner/search?limit=25&skip=0&tld=core&sld=${muti_name}`, {
              headers: {
                'Accept': 'application/json',
                'Api-Key': apiKey,
              },
            });
            setCoreNames(response2.data.pageItems)   
            console.log(response2.data.pageItems)
          } catch (err) {
            console.error(err);
            setError('Failed to fetch ENS names. Please check the address and try again.');
          } finally {
            setLoading(false);
          }
    }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-2/5 flex flex-col items-center justify-center bg-gray-100 rounded-2xl'>
        <div className='w-full flex items-center justify-center mt-8'>
          <div className="w-4/5 ml-20 mb-4">
            <TextField
              fullWidth
              id="standard-search"
              label="Address"
              type="search"
              variant="standard"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>
          <button className="text-2xl w-1/5 ml-4" onClick={fetchEnsNames}><IoIosSearch /></button>
        </div>
        <div className='h-[66vh] overflow-y-scroll mt-2 px-4'>
          {loading?    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
    </div>:
          ensNames.length === 0?<div>Please input the address or the addrees does not have any ENS.</div>:
          <>
            {ensNames.map((name, index) => 
              <PriceCard key={name} countPrice={countPrice} ensName={name} shibObj={shibNames[index]} coreObj={coreNames[index]}></PriceCard>
            )}
            </>
          }
        </div>
        <div className='w-full flex items-center justify-center gap-2 my-8'>
          <div className="w-2/3 mb-4">
            <TextField
              fullWidth
              id="standard-search"
              label="Total Price"
              type="search"
              variant="standard"
              value={`$${price}`}
            />
          </div>
          <button className="w-20 mx-2 bg-blue-300 rounded">Pay</button>
        </div>       
      </div>
   </div>
  );
}

export default Page;
