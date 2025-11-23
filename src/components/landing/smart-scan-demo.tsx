
"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, Bot, FileText, Droplets, Star, User, MapPin, Download, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleProcessLedgerImage } from "@/app/actions/process-ledger-image-action";
import { handleProcessLedgerText } from "@/app/actions/process-ledger-text-action";
import type { ProcessLedgerImageOutput } from "@/ai/flows/process-ledger-image";
import { format, addDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from 'next/link';
import { Label } from "@/components/ui/label";


type ExtractedTransaction = ProcessLedgerImageOutput['transactions'][0] & { 
    id: number,
    extractedSpans?: {
      customerName?: { text: string, startIndex: number, endIndex: number },
      bottleQuantity?: { text: string, startIndex: number, endIndex: number },
      address?: { text: string, startIndex: number, endIndex: number },
    }
};


const sampleMessages = [
    "Good morning po, pa-deliver po ng 5 slim bottles sa 123 Water St, Brgy. Malinis. Salamat! - Maria",
    "Hi, this is Juan dela Cruz from Blk 5 Lot 12, Greenfield Subd. Need 3 round gallons today. Pa-text na lang pag anjan na.",
    "2 bottles pls. 456 Aqua Ave. ASAP. - Pedro",
    "Boss, pahatid 10 gallons. Same address. Bayad Gcash pagdating.",
    "Hello Smart Refill! This is Jane from The Coffee Shop on Main St. Can we get our usual order of 15 containers for bukas? Thanks!",
];

const HighlightedText = ({ text, spans }: { text: string, spans?: ExtractedTransaction['extractedSpans'] }) => {
    if (!spans || Object.keys(spans).length === 0) return <>{text}</>;

    const allSpans = Object.values(spans).filter(Boolean).sort((a, b) => a!.startIndex - b!.startIndex);
    let lastIndex = 0;
    const parts = [];

    allSpans.forEach((span, i) => {
        if (span!.startIndex > lastIndex) {
            parts.push(<span key={`text-${i}`}>{text.substring(lastIndex, span!.startIndex)}</span>);
        }
        parts.push(
            <span key={`span-${i}`} className="bg-primary/20 text-primary font-medium rounded-sm px-1 py-0.5">
                {text.substring(span!.startIndex, span!.endIndex)}
            </span>
        );
        lastIndex = span!.endIndex;
    });

    if (lastIndex < text.length) {
        parts.push(<span key="text-last">{text.substring(lastIndex)}</span>);
    }

    return <>{parts}</>;
};


export function SmartScanDemo() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [extractedData, setExtractedData] = useState<ExtractedTransaction[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isInteracting, setIsInteracting] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate-placeholder-fade-in");

  const { toast } = useToast();

  const placeholder = sampleMessages[currentMessageIndex];

  useEffect(() => {
    if (isInteracting) return;

    const interval = setInterval(() => {
        setAnimationClass("animate-placeholder-fade-out");
        setTimeout(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % sampleMessages.length);
            setAnimationClass("animate-placeholder-fade-in");
        }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInteracting]);

  const handleInteraction = () => {
    if (!isInteracting) {
        setIsInteracting(true);
        setPastedText(placeholder);
    }
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isInteracting) {
        setIsInteracting(true);
    }
    setPastedText(e.target.value);
  }

  const resetState = () => {
      setFile(null);
      setProcessedImage(null);
      setPastedText("");
      setExtractedData(null);
      setLoading(false);
      setIsInteracting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
       if (selectedFile.size > 4 * 1024 * 1024) { // 4MB limit for Gemini
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
        });
        return;
      }
      setFile(selectedFile);
      handleProcessImage(selectedFile);
    } else {
      setFile(null);
    }
  };

  const processApiResponse = (result: ProcessLedgerImageOutput, originalText?: string) => {
      const standardPrice = 50; // Use default price for demo
      const processedTransactions = result.transactions.map((tx, index) => {
          let isNew = tx.isNewCustomer;
          let customerName = tx.customerName;

          // Landing page-only rule for existing customers
          if (originalText && customerName !== 'Walk-in Customer') {
              const lowerCaseText = originalText.toLowerCase();
              const hasAddressHint = tx.address && tx.address.length > 5;
              const hasExistingCustomerKeywords = lowerCaseText.includes('bukas') || lowerCaseText.includes('same address');
              
              if (!hasAddressHint || hasExistingCustomerKeywords) {
                  isNew = false;
              }
          }
          
          // Landing page-only rule to replace "Walk-in"
          if (customerName === 'Walk-in Customer') {
              customerName = "Valued Customer";
              isNew = false; // "Valued Customers" should appear as existing
          }

          return {
              ...tx,
              id: index,
              amount: tx.amount > 0 ? tx.amount : tx.bottleQuantity * standardPrice,
              isNewCustomer: isNew,
              customerName: customerName,
          };
      });

      setExtractedData(processedTransactions);
  }

  const handleProcessText = async () => {
    if (!pastedText.trim()) {
        toast({
            variant: "destructive",
            title: "No text provided",
            description: "Please paste the transaction notes into the text area.",
        });
        return;
    }
    setLoading(true);
    setProcessedImage(null); // Clear image when processing text
    setExtractedData(null);

    try {
        const today = new Date();
        const result = await handleProcessLedgerText({
            ledgerText: pastedText,
            currentDate: format(today, 'yyyy-MM-dd'),
            tomorrowDate: format(addDays(today, 1), 'yyyy-MM-dd'),
            allCustomers: [], // No customers for demo
        });
        
        processApiResponse(result, pastedText);
    } catch (error) {
        console.error("Text processing failed:", error);
        toast({
            variant: "destructive",
            title: "AI Processing Failed",
            description: "Could not extract data from the text. Please ensure it's clear and try again.",
        });
    } finally {
        setLoading(false);
    }
  }

  const handleProcessImage = (imageSource: File | string) => {
    if (!imageSource) {
      toast({
        variant: "destructive",
        title: "No image provided",
        description: "Please select an image file.",
      });
      return;
    }

    setLoading(true);
    setExtractedData(null);
    setPastedText(""); // Clear text when processing image

    const processImage = async (base64Image: string) => {
        setProcessedImage(base64Image); // Set the image for display
        try {
          const today = new Date();
          const result = await handleProcessLedgerImage({
            ledgerImage: base64Image,
            currentDate: format(today, 'yyyy-MM-dd'),
            tomorrowDate: format(addDays(today, 1), 'yyyy-MM-dd'),
            allCustomers: [], // No customers for demo
          });
          
          processApiResponse(result);
        } catch (error) {
          console.error("Image processing failed:", error);
          toast({
            variant: "destructive",
            title: "AI Processing Failed",
            description: "Could not extract data from the image. Please ensure it's clear and try again.",
          });
        } finally {
          setLoading(false);
        }
    };
    
    if (typeof imageSource === 'string') {
        processImage(imageSource);
    } else {
        const reader = new FileReader();
        reader.readAsDataURL(imageSource);
        reader.onload = () => {
          processImage(reader.result as string);
        };
    }
  };

  const renderInitialView = () => (
    <div className="w-full max-w-lg mx-auto space-y-4">
        <div className="animated-gradient-border">
            <Card className="shadow-2xl border-none bg-background/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-2">
                        <h3 className="text-xl font-bold font-headline">Try Smart Scan</h3>
                         <Badge variant="default">
                            Refill AI
                        </Badge>
                    </div>
                     <CardDescription className="max-w-xs mx-auto">An AI tool to turns text messages and sales notes into structured orders using AI.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="text" className="w-full">
                        <TabsList className="relative grid w-full grid-cols-2 bg-muted/60 p-1 h-auto">
                            <TabsTrigger 
                                value="text" 
                                className={cn("transition-colors duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground/80 h-10", pastedText && "data-[state=inactive]:bg-primary/20")}>
                                <FileText className="mr-2 h-4 w-4" />Text
                            </TabsTrigger>
                            <TabsTrigger 
                                value="upload" 
                                className={cn("transition-colors duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground/80 h-10 border-l border-transparent data-[state=active]:border-primary-foreground/20", file && "data-[state=inactive]:bg-primary/20")}>
                                <Upload className="mr-2 h-4 w-4" />Photo
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="text" className="mt-4">
                            <div className="space-y-4">
                                <div className="animated-textarea-container">
                                    <Textarea
                                        key={currentMessageIndex}
                                        placeholder={!isInteracting ? placeholder : ""}
                                        value={pastedText}
                                        onFocus={handleInteraction}
                                        onChange={handleTextChange}
                                        rows={4}
                                        className={cn("bg-background/80 focus-visible:ring-0 focus-visible:ring-offset-0 border-input", !isInteracting && animationClass)}
                                    />
                                </div>
                                <Button onClick={handleProcessText} disabled={loading || !pastedText} className={cn("w-full h-12 text-base btn-press bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/30")}>
                                    {loading && !file ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                                    {loading && !file ? 'Analyzing...' : 'Process with AI'}
                                </Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="upload" className="mt-4">
                            <div className="space-y-4">
                                <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed p-6 text-center">
                                    <Button className={cn("w-full max-w-xs text-primary bg-white hover:bg-muted btn-press")}>
                                        <Label htmlFor="ledger-image-file-demo" className="cursor-pointer w-full flex items-center justify-center">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Choose File
                                        </Label>
                                    </Button>
                                    <Input 
                                        id="ledger-image-file-demo" 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        className="hidden"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {file ? file.name : "Upload sales notes photo."}
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
        {loading && (
             <div className="w-full max-w-lg mx-auto space-y-4 mt-6">
                 <div className="animated-gradient-border">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg text-center">AI-Extracted Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                                <Image
                                    src="https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FLogo%20icon%201.png?alt=media&token=9ef6b797-ce86-420a-a6ae-93c70a112107"
                                    alt="Processing..."
                                    width={32}
                                    height={32}
                                    className="mb-4 animate-roulette-spin"
                                />
                                <p className="font-semibold">Refill AI is processing...</p>
                            </div>
                        </CardContent>
                    </Card>
                 </div>
             </div>
        )}
    </div>
  );

  const renderResultsView = () => (
    <div className={cn("w-full mx-auto grid grid-cols-1 gap-6", (processedImage || pastedText) && "lg:max-w-5xl lg:grid-cols-2")}>
        {/* Source Column */}
        <div className="space-y-4">
            {pastedText && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Original Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm bg-muted/50 p-3 rounded-md">
                            <HighlightedText text={pastedText} spans={extractedData?.[0]?.extractedSpans} />
                        </p>
                    </CardContent>
                </Card>
            )}
             {processedImage && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Original Photo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Image
                            src={processedImage}
                            alt="Uploaded sales note"
                            width={400}
                            height={300}
                            className="rounded-md border object-contain w-full h-auto"
                        />
                    </CardContent>
                </Card>
            )}
        </div>
        {/* Results Column */}
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">AI-Extracted Results</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {extractedData && extractedData.length > 0 ? (
                            <>
                                <div className="space-y-3 max-h-64 overflow-y-auto p-1">
                                    {extractedData.map((tx) => (
                                        <Card key={tx.id} className="p-3 text-sm">
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-semibold flex items-center gap-2">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        <span>{tx.customerName}</span>
                                                        {tx.isNewCustomer ? (
                                                            <Badge variant="outline" className="text-primary border-primary">New</Badge>
                                                        ) : (
                                                            <Badge variant="secondary" className="gap-1">
                                                                <Star className="h-3 w-3" />
                                                                Existing
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{tx.address || 'No address provided'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs font-medium text-primary mt-1">
                                                        <Droplets className="h-3.5 w-3.5" />
                                                        <span>{tx.bottleQuantity} {tx.bottleQuantity > 1 ? 'bottles' : 'bottle'}</span>
                                                    </div>
                                                </div>
                                                <p className="font-bold shrink-0">₱{tx.amount.toFixed(2)}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                <Button onClick={resetState} variant="outline" className="w-full mt-4">Start Over</Button>
                            </>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <p className="font-semibold">No transactions found.</p>
                            </div>
                        )}
                     </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );

  return extractedData ? renderResultsView() : renderInitialView();
}

