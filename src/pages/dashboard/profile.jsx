import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Switch,
  Button,
} from "@material-tailwind/react";

export function Profile() {
  return (
    <div className="mt-4 mb-8 px-4">
      <div className="mb-12">
        <Typography variant="h3" className="text-white mb-2">
          Your Profile
        </Typography>
        <Typography className="text-white/70">
          Manage your health information and preferences
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 text-center">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="user-avatar"
                size="xl"
                variant="circular"
                className="mx-auto mb-4 border-4 border-white/30"
              />
              <Typography variant="h5" className="text-white mb-1">
                Alex Johnson
              </Typography>
              <Typography className="text-white/70">
                HealthDash User
              </Typography>
            </div>
            <CardBody className="p-6">
              <div className="space-y-4">
                <div>
                  <Typography className="text-white/60 text-sm mb-1">
                    Age
                  </Typography>
                  <Typography className="text-white">
                    32 years
                  </Typography>
                </div>
                <div>
                  <Typography className="text-white/60 text-sm mb-1">
                    Weight
                  </Typography>
                  <Typography className="text-white">
                    72 kg
                  </Typography>
                </div>
                <div>
                  <Typography className="text-white/60 text-sm mb-1">
                    Height
                  </Typography>
                  <Typography className="text-white">
                    178 cm
                  </Typography>
                </div>
                <div>
                  <Typography className="text-white/60 text-sm mb-1">
                    BMI
                  </Typography>
                  <Typography className="text-white">
                    22.7 (Normal)
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
            <CardBody className="p-6">
              <Typography variant="h6" className="text-white mb-6">
                Health Information
              </Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Typography className="text-white/60 text-sm mb-1">
                    Blood Type
                  </Typography>
                  <Typography className="text-white">
                    O Positive
                  </Typography>
                </div>
                <div>
                  <Typography className="text-white/60 text-sm mb-1">
                    Allergies
                  </Typography>
                  <Typography className="text-white">
                    Penicillin, Pollen
                  </Typography>
                </div>
                <div>
                  <Typography className="text-white/60 text-sm mb-1">
                    Medical Conditions
                  </Typography>
                  <Typography className="text-white">
                    None
                  </Typography>
                </div>
                <div>
                  <Typography className="text-white/60 text-sm mb-1">
                    Medications
                  </Typography>
                  <Typography className="text-white">
                    None
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
            <CardBody className="p-6">
              <Typography variant="h6" className="text-white mb-6">
                BMI Calculator
              </Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Typography className="text-white/60 text-sm mb-1">
                    Height (cm)
                  </Typography>
                  <input 
                    type="number" 
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="178"
                  />
                </div>
                <div>
                  <Typography className="text-white/60 text-sm mb-1">
                    Weight (kg)
                  </Typography>
                  <input 
                    type="number" 
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="72"
                  />
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-lg">
                    Calculate
                  </Button>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography className="text-white">
                    Your BMI: <span className="font-bold">22.7</span>
                  </Typography>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                    Normal
                  </span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500 w-3/4"></div>
                </div>
                <div className="flex justify-between text-xs text-white/60 mt-2">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
            <CardBody className="p-6">
              <Typography variant="h6" className="text-white mb-6">
                Preferences
              </Typography>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <div>
                    <Typography className="text-white">
                      Dark Mode
                    </Typography>
                    <Typography className="text-white/60 text-sm">
                      Enable dark theme
                    </Typography>
                  </div>
                  <Switch defaultChecked color="blue" />
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <div>
                    <Typography className="text-white">
                      Notifications
                    </Typography>
                    <Typography className="text-white/60 text-sm">
                      Receive health alerts
                    </Typography>
                  </div>
                  <Switch defaultChecked color="blue" />
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <div>
                    <Typography className="text-white">
                      Weekly Reports
                    </Typography>
                    <Typography className="text-white/60 text-sm">
                      Email health summaries
                    </Typography>
                  </div>
                  <Switch color="blue" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Typography className="text-white">
                      Data Sharing
                    </Typography>
                    <Typography className="text-white/60 text-sm">
                      Share anonymized data for research
                    </Typography>
                  </div>
                  <Switch color="blue" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
