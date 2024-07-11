#!/usr/bin/perl

$linkdata = "sayhi.txt";

$interactfile = "../sayhi/thanks/index.shtml";

$interactbase = "https://bulltown.2022.jenett.org/sayhi/thanks/";

$dateCmd = '/bin/date';

chop ($timeStamp = `$dateCmd +"%a %D at %H%M %Z"`);

read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});

@pairs = split(/&/, $buffer);

foreach $pair (@pairs) {
   ($name, $value) = split(/=/, $pair);

   $value =~ tr/+/ /;
   $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
   $value =~ s/<([^>]|\n)*>//g;
   $value =~ s/<//g;
   $value =~ s/>//g;
   $value =~ s/\n/<br>/g;
   $value =~ s/http:\/\///g;
   $FORM{$name} = $value;
}

if (!($FORM{'hoo'})) {
} else {

if ($linkdata ne '') {
	open (THELINKDAT,">>$linkdata");	  
	print THELINKDAT "$timeStamp|$ENV{'REMOTE_ADDR'}|$FORM{'name'}|$FORM{'url'}|$FORM{'hoo'}\n";
	close(THELINKDAT);

}	



open(FILE,"$interactfile");
@lines = <FILE>;
close(FILE);

open (FILE,">$interactfile");

if (!($FORM{'name'})) {
$thename = "anonymous guest";
} else {
$thename = $FORM{'name'};
}

if (!($FORM{'url'})) {
$thelink = "posted by $thename on $timeStamp";
} else {
$thelink = "posted by <a href=\"http://$FORM{'url'}\" target=\"new\">$thename</a> on $timeStamp";
}

foreach $line (@lines) {
if ($line =~ /<!--hoo goes here-->/)
{
print FILE "\n<!--hoo goes here-->\n\n<p>$FORM{'hoo'}<p>$FORM{'url'}<p>$thelink<p><hr noshade size=1>\n"; 
} else {
print FILE $line;
}
}
close(FILE);
}

print "Location: $interactbase\n\n";
