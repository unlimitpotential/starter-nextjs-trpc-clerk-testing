/* eslint-disable react/jsx-key */
import React from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { Trash2, Pause, Play } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import Utils from '../../utils/utils';
import { Button } from './butto'; // Replace with the actual path to your Button component
import { Card, CardDescription, CardHeader, CardTitle } from './card'; // Replace with the actual path to your Card components
import Loader from './loader'; // Replace with the actual path to your Loader component
import { useProductAccordionStore } from '../../data/stores/product_accordion_store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";


const sampleProductData = {
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
  ],
};

const ProductsPage = () => {
  const { data: products } = sampleProductData;
  const {
  
    statusLoaders,
  
  } = useProductAccordionStore();
  return (
    <div>
      {products.map((product, index) => {
        return (
          <Tabs
          defaultValue="ALL"
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="ALL">All</TabsTrigger>
            <TabsTrigger value="RUNNING">Running</TabsTrigger>
            <TabsTrigger value="PAUSED">Paused</TabsTrigger>
          </TabsList>
          <Accordion type="single" collapsible>
          <AccordionItem value={`item-${index}`} key={product.id}>
            <AccordionTrigger>
              <div className="md:flex justify-between items-center w-full space-y-2 md:space-y-0">
                <div className="flex justify-center gap-6">
                  <Image
                    src={product.imageUrl}
                    alt="product"
                    priority={true}
                    width={0}
                    height={0}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="../assets/images/product_loader.png"
                    className="w-[90px] h-[70px] rounded"
                  />
                  <div>
                    <h5 className="text-start max-w-[25ch] md:max-w-[50ch] overflow-hidden">
                      {product.name}
                    </h5>
                    <div className="flex gap-3 text-[0.7em] text-secondary-foreground">
                      <div className="flex items-start flex-col">
                        <span>Ordered Price</span>
                        <span>₹{product.orderedPrice}</span>
                      </div>
                      <div className="flex items-start flex-col">
                        <span>Interval</span>
                        <span>{product.interval}S</span>
                      </div>
                      <div className="flex items-start flex-col">
                        <span>Store</span>
                        <span>
                          {Utils.capitalize({
                            text: product.store,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center px-6 gap-4 ml-9 md:ml-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-auto h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct(product);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  ></div>
                  <div className="flex justify-center items-center gap-1">
                    {product.status === 'RUNNING' ? (
                      <>
                        {statusLoaders[index] === true ? (
                          <Loader showLoadingText={false} size={16} />
                        ) : (
                          <Pause
                            className="h-4 w-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              changeProductStatus({
                                status: 'PAUSED',
                                product,
                                index,
                              });
                            }}
                          />
                        )}
                        <div className="w-[5px] h-[5px] bg-success rounded-xl"></div>
                        <span className="text-[0.7em] text-success">Running</span>
                      </>
                    ) : (
                      <>
                        {statusLoaders[index] === true ? (
                          <Loader showLoadingText={false} size={16} />
                        ) : (
                          <Play
                            className="h-4 w-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              changeProductStatus({
                                status: 'RUNNING',
                                product,
                                index,
                              });
                            }}
                          />
                        )}
                        <div className="w-[5px] h-[5px] bg-warning rounded-xl"></div>
                        <span className="text-[0.7em] text-warning">Paused</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {product.snapshots?.map((snapshot) => {
                const date = new Intl.DateTimeFormat('en-IN', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                }).format(new Date());

                const formattedDate = date.replace(' at', '');
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
                        {formattedDate}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          </Accordion>
          </Tabs>
        );
      })}
    </div>
  );
};


export default ProductsPage;
