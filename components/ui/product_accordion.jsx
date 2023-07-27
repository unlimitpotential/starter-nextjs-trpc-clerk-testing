import React from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { Trash2, Pause, Play } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from './accordion'; // Replace with the actual path to your accordion component
import Utils from '../../utils/utils';
import { Button } from './butto'; // Replace with the actual path to your Button component
import { Card, CardDescription, CardHeader, CardTitle } from './card'; // Replace with the actual path to your Card components
import Loader from './loader'; // Replace with the actual path to your Loader component

// Sample product data
const productData = {
  status: true,
  data: [
    {
      id: 11,
      link: 'https://www.amazon.com/Victoria-Beckham-Runway-Pre-Loved-Dolman/dp/B0B9YT5N1T?ref_=pb_hm',
      imageUrl: 'https://m.media-amazon.com/images/I/51JQGwCzaTL.__AC_SX342_SY445_QL70_ML2_.jpg',
      name: 'Victoria Victoria Beckham Rent The Runway Pre-Loved Dolman Sleeve Dress',
      store: 'AMAZON',
      interval: 30,
      orderedPrice: 10,
      createdAt: '2023-07-26T23:46:45.336Z',
      status: 'RUNNING',
      userId: 'user_2T88t7KZE1r9WluWIgl2fcZJnMn',
      snapshots: [],
    },
    // Add more product data as needed
  ],
};

const ProductsPage = ({ productData }) => {

  return (
    <div>
      {products.map((product, index) => {
        return (
          <AccordionItem value={`item-${index}`} key={product.id}>
            <AccordionTrigger>
              <div className="md:flex justify-between items-center w-full space-y-2 md:space-y-0">
                {/* Rest of the product rendering code */}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {product.snapshots?.map((snapshot) => {
                // Rendering snapshots data
                return (
                  <Card key={snapshot.id}>
                    <CardHeader className="flex justify-between items-center flex-row">
                      <CardTitle
                        className={`${
                          snapshot.price ? 'text-success' : 'text-destructive'
                        }  text-base`}
                      >
                        ₹{snapshot.price}
                      </CardTitle>
                      <CardDescription className="max-w-[18ch] sm:max-w-none">
                        {/* Formatted Date */}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      productData,
    },
  };
};

export default ProductsPage;
