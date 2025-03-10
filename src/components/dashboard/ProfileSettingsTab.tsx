
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { User, Mail, MapPin, Globe, Shield, Bell } from "lucide-react";

interface ProfileData {
  fullName: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  language: string;
  notifications: {
    email: boolean;
    rewards: boolean;
    governance: boolean;
  };
}

const ProfileSettingsTab: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "Alex Johnson",
    email: "alex@example.com",
    bio: "Passionate about decentralized networking and democratizing internet access.",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    language: "english",
    notifications: {
      email: true,
      rewards: true,
      governance: true,
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real application, this would call an API to update the user's profile
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <User className="mr-2" /> Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-ana-darkblue/50 text-white" : "bg-background text-white"}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="flex">
                <Input
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-ana-darkblue/50 text-white" : "bg-background text-white"}
                />
                {!profile.notifications.email && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 text-ana-purple"
                    onClick={() => {
                      if (isEditing) {
                        setProfile(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            email: true
                          }
                        }));
                        toast.success("Email notifications enabled");
                      }
                    }}
                    disabled={!isEditing}
                  >
                    <Mail size={16} className="mr-1" /> Verify
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-white">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className={!isEditing ? "bg-ana-darkblue/50 text-white min-h-[100px]" : "bg-background text-white min-h-[100px]"}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Location</Label>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-ana-purple" />
                <Input
                  id="location"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-ana-darkblue/50 text-white" : "bg-background text-white"}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website" className="text-white">Website</Label>
              <div className="flex items-center">
                <Globe size={16} className="mr-2 text-ana-purple" />
                <Input
                  id="website"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://your-website.com"
                  disabled={!isEditing}
                  className={!isEditing ? "bg-ana-darkblue/50 text-white" : "bg-background text-white"}
                />
              </div>
            </div>
          </div>
        </CardContent>
        
        {isEditing && (
          <CardFooter className="justify-end space-x-2 border-t border-ana-purple/20 pt-4">
            <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        )}
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="mr-2" /> Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language" className="text-white">Language</Label>
            <Select
              disabled={!isEditing}
              value={profile.language}
              onValueChange={(value) => handleSelectChange("language", value)}
            >
              <SelectTrigger className={!isEditing ? "bg-ana-darkblue/50 text-white border-ana-purple/30" : ""}>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-white flex items-center">
                <Bell className="mr-2" /> Notification Settings
              </Label>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Settings
                </Button>
              )}
            </div>
            
            <Card className="bg-ana-darkblue/30 border border-ana-purple/20">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white">Email Notifications</span>
                  <Button
                    variant={profile.notifications.email ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (isEditing) {
                        setProfile(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            email: !prev.notifications.email
                          }
                        }));
                      }
                    }}
                    disabled={!isEditing}
                  >
                    {profile.notifications.email ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white">Reward Notifications</span>
                  <Button
                    variant={profile.notifications.rewards ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (isEditing) {
                        setProfile(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            rewards: !prev.notifications.rewards
                          }
                        }));
                      }
                    }}
                    disabled={!isEditing}
                  >
                    {profile.notifications.rewards ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white">Governance Notifications</span>
                  <Button
                    variant={profile.notifications.governance ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (isEditing) {
                        setProfile(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            governance: !prev.notifications.governance
                          }
                        }));
                      }
                    }}
                    disabled={!isEditing}
                  >
                    {profile.notifications.governance ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        
        {!isEditing && (
          <CardFooter className="justify-end">
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ProfileSettingsTab;
