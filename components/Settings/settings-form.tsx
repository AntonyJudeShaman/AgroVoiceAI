'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function SettingsForm({
  user,
  className,
  ...props
}: {
  user: any;
  className: string;
}) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [name, setName] = useState(user?.name || '');
  const [isNameChanged, setIsNameChanged] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsNameChanged(event.target.value !== user?.name);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setIsSaving(true);

    try {
      const response = await fetch(`/api/name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, name }), // Send user id along with updated name
      });

      if (response.ok) {
        toast.success('Name updated successfully');
        setIsNameChanged(false);
      } else {
        toast.error('Failed to update name');
      }
    } catch (error) {
      toast.error('Error updating name:');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className={cn(className, 'space-y-4')} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col md:space-x-4 md:space-y-0 space-y-4 space-x-0 md:flex-row">
        <Card className="md:w-2/3 w-full">
          <CardHeader>
            <CardTitle>Your Name</CardTitle>
            <CardDescription>Please enter your full name or a display name you are comfortable with.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <Input
                id="name"
                className=""
                size={32}
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className={cn(buttonVariants(), className, 'hover:text-black/80 hover:bg-white/80', `${isNameChanged ? '' : 'bg-transparent text-gray-400 border-gray-500'}`)}
              disabled={!isNameChanged || isSaving}
              variant="outline"
            >
              {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
              <span>Save</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
