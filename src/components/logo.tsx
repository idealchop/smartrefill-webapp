export function SmartRefillLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg bg-primary p-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-droplets h-6 w-6 text-primary-foreground"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.49-2.21-1.25-3.02C8.98 8.45 8 7.31 8 6.05 8 4.83 9 3 11 3s3 1.83 3 3.05c0 1.26-.98 2.4-1.75 3.18C11.49 10.08 11 11.13 11 12.25c0 2.23 1.8 4.05 4 4.05"/><path d="M12.56 16.3h-.01c-2.2 0-4-1.83-4-4.05 0-1.16.49-2.21 1.25-3.02C10.58 8.45 11.5 7.31 11.5 6.05c0-1.23-1-3.05-3-3.05s-3 1.83-3 3.05c0 1.26.98 2.4 1.75 3.18.76.81 1.25 1.86 1.25 3.02 0 2.23-1.8 4.05-4 4.05h-.01"/></svg>
      </div>
      <span className="font-headline text-xl font-bold text-sidebar-foreground">SmartRefill</span>
    </div>
  );
}
